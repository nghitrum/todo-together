const { prisma } = require('../generated/prisma-client');

const Mutation = {
  async hi(parent, args, ctx) {
    return 'hello World';
  }
};

module.exports = Mutation;
