const { prisma } = require('../generated/prisma-client');

const Mutation = {
  async hi(parent, args, ctx) {
    console.log(ctx.req.headers);
    return 'hello mutation';
  },

  /**
   * Authentication
   * @param {*} parent
   * @param {*} args
   * @param {*} ctx
   */
  async authenticate(parent, args, ctx) {
    if (ctx.user) {
      const email = ctx.user.email;
      console.log('---............----');

      const checkUser = await prisma.user({ email });
      console.log('---...sdasasd');

      console.log(checkUser);

      if (!checkUser) {
        console.log('--------------------------------');
        return await prisma.createUser({
          auth0id: sub,
          email: ctx.user.email,
          name: ctx.user.name
        });
      }

      return checkUser;
    }
    return null;
  },

  /*********************************************************************
   * Regarding to todos
   */

  /**
   * Create A ToDo
   * @param {*} _
   * @param {*} args
   * @param {*} ctx
   */
  async createToDo(_, args, ctx) {
    if (!ctx.user) {
      throw new Error('You must be logged in to do that!');
    }
    const sub = ctx.user.sub;
    const user = await prisma.user({ auth0id: sub });

    let todo = await prisma.createToDo({
      ...args,
      user: {
        connect: {
          id: user.id
        }
      }
    });

    todo.user = user;
    todo.sharedWith = [];
    return todo;
  },

  /**
   * Update a ToDo
   * @param {*} _
   * @param {*} args
   * @param {*} ctx
   */
  async updateToDo(_, args, ctx) {
    if (!ctx.user) {
      throw new Error('You must be logged in to do that!');
    }

    const updates = { ...args };
    // remove the ID from the updates
    delete updates.id;
    // run the update method
    return await prisma.updateToDo({
      data: updates,
      where: {
        id: args.id
      }
    });
  },

  /**
   * Done a ToDo
   * @param {*} _
   * @param {*} param1
   * @param {*} ctx
   */
  async updateToDoDone(_, { id }, ctx) {
    if (!ctx.user) {
      throw new Error('You must be logged in to do that!');
    }
    // run the update method
    return await prisma.updateToDo({
      data: {
        isDone: true
      },
      where: {
        id
      }
    });
  },

  /**
   * UnDone a ToDo
   * @param {*} _
   * @param {*} param1
   * @param {*} ctx
   */
  async updateToDoUnDone(_, { id }, ctx) {
    if (!ctx.user) {
      throw new Error('You must be logged in to do that!');
    }
    // run the update method
    return await prisma.updateToDo({
      data: {
        isDone: false
      },
      where: {
        id
      }
    });
  },

  /**
   * Delete A ToDo
   * @param {*} _
   * @param {*} param1
   * @param {*} ctx
   */
  async deleteToDo(_, { id }, ctx) {
    if (!ctx.user) {
      throw new Error('You must be logged in to do that!');
    }

    return await prisma.deleteToDo({ id });
  },

  /**
   * Share todo to other user
   * @param {*} _
   * @param {*} param1
   * @param {*} ctx
   */
  async shareToDo(_, { todoId, userId }, ctx) {
    if (!ctx.user) {
      throw new Error('You must be logged in to do that!');
    }

    if (!userId) {
      throw new Error('Cannot found this user.');
    }

    // run the update method
    let todo =  await prisma.updateToDo({
      data: {
        sharedWith: {
          connect: [
            {
              id: userId
            }
          ]
        }
      },
      where: {
        id: todoId
      }
    });
    todo.sharedWith = await prisma.toDo({ id: todoId }).sharedWith();

    return todo;
  },
};

module.exports = Mutation;
