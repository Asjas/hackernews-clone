const Mutations = {
  async post(parent, args, ctx, info) {
    const Link = await ctx.db.mutation.createLink(
      {
        data: {
          url: args.url,
          description: args.description,
        },
      },
      info,
    );

    return Link;
  },
};

module.exports = Mutations;
