require('dotenv').config({ path: 'variables.env' });
const { formatError } = require('apollo-errors');
const { GraphQLServer } = require('graphql-yoga');
const jwt = require('jsonwebtoken');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const { prisma } = require('./generated/prisma-client');

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers: {
    Mutation,
    Query,
  },
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: req => ({ ...req, db: prisma }),
});

// Decode JWT to get user id per each request
server.express.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = userId;
  }
  next();
});

server.start(
  {
    formatError,
  },
  ({ port }) => {
    console.log(`Server is running on port ${port}`);
  },
);
