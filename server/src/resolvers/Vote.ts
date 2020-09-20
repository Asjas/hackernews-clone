import { Context } from '../utils';

export const Vote = {
  async link(parent, _args, ctx: Context, _info) {
    return ctx.prisma.vote.findOne({ where: { id: parent.id } }).link();
  },
  async user(parent, _args, ctx: Context, _info) {
    return ctx.prisma.vote.findOne({ where: { id: parent.id } }).user();
  },
};
