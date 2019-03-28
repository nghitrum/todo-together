require('dotenv').config({ path: 'variables.env' });
const { prisma } = require('./generated/prisma-client');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const path = require('path');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

const resolvers = {
  Query,
  Mutation
};

const typeDefs = importSchema(path.resolve('src/schema.graphql'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: prisma
  }),
  cors: cors(corsOptions)
});

const app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://nghitrum.eu.auth0.com/.well-known/jwks.json'
  }),
  aud: 'http://localhost:4000/',
  issuer: 'https://nghitrum.eu.auth0.com/',
  algorithms: ['RS256']
});

//app.use(jwtCheck);

app.use(cookieParser());

// decode the JWT so we can get the user Id on each request
app.use((req, res, next) => {
  console.log(req.headers);

  next();
});

// 2. Create a middleware that populates the user on each request

server.applyMiddleware({ app, path: '/' });

app.listen({ port: 4000 }, () => {
  console.log('Apollo Server on http://localhost:4000/');
});
