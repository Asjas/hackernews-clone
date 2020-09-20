import { Context } from '../utils';

export const Subscription = {
  newLink: {
    subscribe: async (_parent, _args, ctx: Context, _info) => {
      return ctx.pubsub.subscribe('newLink');
    },
  },
  newVote: {
    subscribe: async (_parent, _args, ctx: Context, _info) => {
      return ctx.pubsub.subscribe('newVote');
    },
  },
};
