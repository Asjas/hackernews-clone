import { Context } from '../../utils';

export const Link = {
  async postedBy(parent, _args, ctx: Context, _info) {
    return ctx.prisma.link.findOne({ where: { id: parent.id } }).postedBy();
  },
  async votes(parent, _args, ctx: Context, _info) {
    return ctx.prisma.link.findOne({ where: { id: parent.id } }).votes();
  },
};
