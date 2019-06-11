const Query = {
  async feed(parent, args, ctx, info) {
    return await ctx.prisma.links();
  },
};

module.exports = Query;
