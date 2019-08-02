import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Context, APP_SECRET, getUserId } from '../utils';

export const Mutation = {
  async signup(parent, args, ctx: Context, info) {
    args.email = args.email.toLowerCase();

    const password = await bcrypt.hash(args.password, 10);

    const user = await ctx.prisma.createUser({
      ...args,
      password,
    });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return { token, user };
  },
  async login(parent, args, ctx: Context, info) {
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
  async post(parent, args, ctx: Context, info) {
    const userId = getUserId(ctx);

    const Link = await ctx.prisma.createLink({
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    });

    return Link;
  },
  async vote(parent, args, ctx: Context, info) {
    const userId = getUserId(ctx);

    const linkExists = await ctx.prisma.$exists.vote({
      user: { id: userId },
      link: { id: args.linkId },
    });

    if (linkExists) {
      throw new Error(`Already voted for link: ${args.linkId}`);
    }

    return ctx.prisma.createVote({
      user: { connect: { id: userId } },
      link: { connect: { id: args.linkId } },
    });
  },
};
