import { Context } from '../utils';

export const Query = {
  async feed(_parent, args, ctx: Context, _info) {
    const where = args.filter
      ? {
          OR: [{ description: { contains: args.filter } }, { url: { contains: args.filter } }],
        }
      : {};

    const links = await ctx.prisma.link.findMany({
      where,
      take: args.take,
      skip: args.skip,
      orderBy: args.orderBy,
    });

    const count = await ctx.prisma.link.count({ where });

    return { links, count };
  },
};
