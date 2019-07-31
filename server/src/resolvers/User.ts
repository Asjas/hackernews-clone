const User = {
  async links(parent, args, ctx, info) {
    return await ctx.prisma.user({ id: parent.id }).links();
  },
};

export default User;
