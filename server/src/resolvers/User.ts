import { Context } from '../utils';

export const User = {
  async links(parent, args, ctx: Context, info) {
    return await ctx.prisma.user({ id: parent.id }).links();
  },
};
