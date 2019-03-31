const { prisma } = require('../generated/prisma-client');

const Mutation = {
  async hi(parent, args, ctx) {
    console.log(ctx.req.headers);
    return 'hello mutation';
  },

  async authenticate(parent, args, ctx) {
    if (ctx.user) {
      const sub = ctx.user.sub;
      const checkUser = await prisma.user({ auth0id: sub });

      if (!checkUser) {
        const newUser = await prisma.createUser({
          auth0id: sub
        });
      }

      return true;
    }
    return false;
  }
};

module.exports = Mutation;
