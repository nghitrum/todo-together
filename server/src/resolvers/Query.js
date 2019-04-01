const { prisma } = require('../generated/prisma-client');

const Query = {
  async hi(parent, args, ctx) {
    console.log(ctx.req);
    return 'hi query';
  },

  /**
   * Get All Todoes of a user
   * @param {*} _
   * @param {*} args
   * @param {*} ctx
   */
  async readAllToDoes(_, args, ctx) {
    if (!ctx.user) {
      throw new Error('You must be logged in to do that!');
    }
    const sub = ctx.user.sub;
    const user = await prisma.user({ auth0id: sub });

    return await prisma.user({ id: user.id }).todoes();
  },

  /**
   * Read one ToDo
   * @param {*} _ 
   * @param {*} args 
   * @param {*} ctx 
   */
  async readToDo(_, args, ctx) {
    if (!ctx.user) {
      throw new Error('You must be logged in to do that!');
    }
    
    return await prisma.toDo({ id: args.id });
  }
};

module.exports = Query;
