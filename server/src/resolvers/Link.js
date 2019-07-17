const Link = {
  async postedBy(parent, args, ctx, info) {
    return ctx.prisma.link({ id: parent.id }).postedBy();
  },
  async votes(parent, args, ctx, info) {
    return ctx.prisma.link({ id: parent.id }).votes();
  },
};

module.exports = Link;
