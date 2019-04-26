require('dotenv').config();
const { prisma } = require('./generated/prisma-client');
const { ApolloServer } = require('apollo-server');
const { importSchema } = require('graphql-import');
const path = require('path');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const jwt = require('jsonwebtoken');

const jwksClient = require('jwks-rsa');

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
  },
  cors: {
    origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL :'http://localhost:3000',
    credentials: true
  }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
