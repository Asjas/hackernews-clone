// @ts-nocheck

import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { Context, getUserId, APP_SECRET } from '../../utils';

export const Mutation = {
  async signup(_parent, args, ctx: Context, _info) {
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
  async login(_parent, args, ctx: Context, _info) {
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
  async post(_parent, args, ctx: Context, _info) {
    const userId = getUserId(ctx);

    const newLink = await ctx.prisma.link.create({
      data: {
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
      },
    });

    await ctx.pubsub.publish({ topic: 'newLink', payload: { newLink } });

    return newLink;
  },
  async vote(_parent, args, ctx: Context, _info) {
    const userId = getUserId(ctx);

    const vote = await ctx.prisma.vote.findOne({
      where: {
        linkId_userId: {
          linkId: Number(args.linkId),
          userId: userId,
        },
      },
    });

    if (Boolean(vote)) {
      throw new Error(`Already voted for link: ${args.linkId}`);
    }

    const newVote = await ctx.prisma.vote.create({
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: Number(args.linkId) } },
      },
    });

    await ctx.pubsub.publish({ topic: 'newVote', payload: { newVote } });

    return newVote;
  },
};
