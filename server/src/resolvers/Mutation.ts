import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { Context, getUserId } from '../utils';

const { APP_SECRET } = process.env;

export const Mutation = {
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();

    const password = await argon2.hash(args.password);

    const user = await ctx.prisma.user.create({
      data: {
        ...args,
        password,
      },
    });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return { token, user };
  },
  async login(parent, args, ctx: Context, info) {
    const user = await ctx.prisma.user.findOne({ where: { email: args.email } });

    if (!user) {
      throw new Error('No such user found!');
    }

    const valid = await argon2.verify(user.password, args.password);

    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return { token, user };
  },
  async post(parent, args, ctx: Context, info) {
    const userId = getUserId(ctx);

    const Link = await ctx.prisma.link.create({
      data: {
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
      },
    });

    return Link;
  },
  async vote(parent, args, ctx: Context, info) {
    const userId = getUserId(ctx);

    const linkExists = await ctx.prisma.vote.findOne({ where: { id: userId } });

    // ({
    //   user: { id: userId },
    //   link: { id: args.linkId },
    // });

    console.log(linkExists);

    if (linkExists.id === args.linkId) {
      throw new Error(`Already voted for link: ${args.linkId}`);
    }

    const voted = await ctx.prisma.vote.create({
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: Number(args.linkId) } },
      },
    });
  },
};
