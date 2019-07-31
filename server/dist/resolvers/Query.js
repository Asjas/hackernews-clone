'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const Query = {
  async feed(parent, args, ctx, info) {
    const where = args.filter
      ? {
          OR: [{ description_contains: args.filter }, { url_contains: args.filter }],
        }
      : {};
    const links = await ctx.prisma.links({
      where,
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy,
    });
    const count = await ctx.prisma
      .linksConnection({ where })
      .aggregate()
      .count();
    return { links, count };
  },
};
exports.default = Query;
//# sourceMappingURL=Query.js.map
