import { Context } from '../utils';

export const Query = {
  async feed(parent, args, ctx: Context, info) {
    const links = await ctx.prisma.link.findMany({
      where: {
        OR: [{ description: { contains: args.filter } }, { url: { contains: args.filter } }],
      },
      skip: args.skip,
      first: args.first,
      orderBy: args.orderBy,
    });

    // Until Prisma 2 supports Aggregate queries I'm using the length of the returned links here (seems to work)
    // const count = await ctx.prisma.link.count();
    const count = links.length;

    return { links, count };
  },
};
