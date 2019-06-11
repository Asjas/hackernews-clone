const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

const Mutations = {
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();

    const password = await bcrypt.hash(args.password, 10);

    const user = await ctx.prisma.createUser({
      ...args,
      password,
    });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return { token, user };
  },
  async login(parent, args, ctx, info) {
    const user = await ctx.prisma.user({ email: args.email });

    if (!user) {
      throw new Error('No such user found!');
    }

    const valid = await bcrypt.compare(args.password, user.password);

    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return { token, user };
  },
  async post(parent, args, ctx, info) {
    const userId = getUserId(ctx);

    const Link = await ctx.prisma.createLink({
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    });

    return Link;
  },
};

module.exports = Mutations;
