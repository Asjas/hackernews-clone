async function newLinkSubscribe(parent, args, ctx, info) {
  return ctx.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node();
}

async function newVoteSubscribe(parent, args, ctx, info) {
  return ctx.prisma.$subscribe.vote({ mutation_in: ['CREATED'] }).node();
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => {
    return payload;
  },
};

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: payload => {
    return payload;
  },
};

module.exports = {
  newLink,
  newVote,
};
