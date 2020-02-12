import { Context } from '../utils';

export const User = {
  async links(parent, args, ctx: Context, info) {
    return await ctx.prisma.user.findOne({ where: { id: parent.id } }).links();
  },
};
