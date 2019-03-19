const { prisma } = require('../generated/prisma-client');

const Query = {
  async hi(parent, args, ctx) {
    return "hello World";
  }
};

module.exports = Query;
