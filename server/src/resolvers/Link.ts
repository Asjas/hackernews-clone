import { Context } from '../utils';

export const Link = {
  async postedBy(parent, args, ctx: Context, info) {
    return ctx.prisma.link.findOne({ where: { id: parent.id } }).postedBy();
  },
  async votes(parent, args, ctx: Context, info) {
    return ctx.prisma.link.findOne({ where: { id: parent.id } }).votes();
  },
};
