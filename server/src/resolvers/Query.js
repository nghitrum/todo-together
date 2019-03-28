const { prisma } = require('../generated/prisma-client');

const Query = {
  async hi(parent, args, ctx) {

    console.log(ctx.req);
    return 'hi query';
  }
};

module.exports = Query;
