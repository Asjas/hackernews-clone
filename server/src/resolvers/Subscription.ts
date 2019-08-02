import { Context } from '../utils';

export const Subscription = {
  newLink: {
    subscribe: async (parent, args, ctx: Context, info) => {
      return ctx.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node();
    },
    resolve: payload => {
      return payload;
    },
  },
  newVote: {
    subscribe: async (parent, args, ctx: Context, info) => {
      return ctx.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node();
    },
    resolve: payload => {
      return payload;
    },
  },
};
