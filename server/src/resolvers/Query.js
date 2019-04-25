const { prisma } = require('../generated/prisma-client');

const Query = {
  async hi(parent, args, ctx) {
    console.log(ctx.req);
    return 'hi query';
  },

  /*********************************************************************
   * Regarding to todos
   */

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

    const fragment = `
      fragment todoesWithUsers on ToDo {
        id
        title
        description
        isDone
        user {
          id
          email
        }
        sharedWith {
          id
          email
        }
      }
    `;

    return await prisma
      .user({ id: user.id })
      .todoes({ orderBy: 'createdAt_DESC' })
      .$fragment(fragment);
  },

  /**
   * Get all Todoes shared with Me
   * @param {*} _
   * @param {*} args
   * @param {*} ctx
   */
  async readAllToDoesSharedWithMe(_, args, ctx) {
    if (!ctx.user) {
      throw new Error('You must be logged in to do that!');
    }
    const sub = ctx.user.sub;

    const fragment = `
      fragment todoesWithUsers on ToDo {
        id
        title
        description
        isDone
        user {
          id
          email
        }
        sharedWith {
          id
          email
        }
      }
    `;

    return await prisma
      .user({ auth0id: sub })
      .sharedWith({ orderBy: 'createdAt_DESC' })
      .$fragment(fragment);
  },

  /**
   * Read one ToDo
   * @param {*} _
   * @param {*} args
   * @param {*} ctx
   */
  async readToDo(_, { id }, ctx) {
    if (!ctx.user) {
      throw new Error('You must be logged in to do that!');
    }

    return await prisma.toDo({ id });
  },

  /*********************************************************************
   * Regarding to labels
   */

  /**
   * Read all Labels
   * @param {*} _
   * @param {*} args
   * @param {*} ctx
   */
  async readAllLabels(_, args, ctx) {
    if (!ctx.user) {
      throw new Error('You must be logged in to do that!');
    }
    const sub = ctx.user.sub;
    const user = await prisma.user({ auth0id: sub });

    return await prisma.user({ id: user.id }).labels();
  },

  async readLabel(_, { id }, ctx) {
    if (!ctx.user) {
      throw new Error('You must be logged in to do that!');
    }

    return await prisma.label({ id });
  },

  /*********************************************************************
   * Regarding to users
   */

  async readAllUsersExceptMe(_, args, ctx) {
    if (!ctx.user) {
      throw new Error('You must be logged in to do that!');
    }

    return await prisma.users({
      where: {
        auth0id_not: ctx.user.sub
      }
    });
  }
};

module.exports = Query;
