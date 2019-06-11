const { forwardTo } = require('prisma-binding');

const Link = {
  async postedBy(parent, args, ctx, info) {
    return await ctx.prisma.link({ id: parent.id }).postedBy();
  },
};

module.exports = Link;
