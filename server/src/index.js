require('dotenv').config();
const { prisma } = require('./generated/prisma-client');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const path = require('path');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const jwksClient = require('jwks-rsa');


const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true
};

const resolvers = {
  Query,
  Mutation
};

const typeDefs = importSchema(path.resolve('src/schema.graphql'));

const client = jwksClient({
  jwksUri: `https://nghitrum.eu.auth0.com/.well-known/jwks.json`
});

function getKey(header, cb){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    //console.log(signingKey);
    cb(null, signingKey);
  });
}

const options = {
  aud: process.env.AUTH0_AUD,
  issuer: `https://nghitrum.eu.auth0.com/`,
  algorithms: ['RS256']
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({req}) => {
    let user;
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      user = await new Promise((resolve, reject) => {
        jwt.verify(token, getKey, options, (err, decoded) => {
          if(err) {
            return reject(err);
          }   
          resolve(decoded);
        });
      });
    }
  
    return {
      ...req,
      db: prisma,
      user
    }
  }
});

const app = express();

app.use(cookieParser());

server.applyMiddleware({ app, cors: corsOptions });

app.listen({ port: process.env.PORT || 4000 }, () => {
  console.log('Apollo Server on http://localhost:4000/');
});
