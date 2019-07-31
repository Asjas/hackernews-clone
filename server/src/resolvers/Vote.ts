const Vote = {
  async link(parent, args, ctx, info) {
    ctx.prisma.vote({ id: parent.id }).link();
  },
  async user(parent, args, ctx, info) {
    ctx.prisma.vote({ id: parent.id }).user();
  },
};

export default Vote;
