import { Context } from '../../utils';

export const User = {
  async links(parent, _args, ctx: Context, _info) {
    return await ctx.prisma.user.findOne({ where: { id: parent.id } }).links();
  },
};
