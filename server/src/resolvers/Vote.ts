import { Context } from '../utils';

export const Vote = {
  async link(parent, args, ctx: Context, info) {
    ctx.prisma.vote({ id: parent.id }).link();
  },
  async user(parent, args, ctx: Context, info) {
    ctx.prisma.vote({ id: parent.id }).user();
  },
};
