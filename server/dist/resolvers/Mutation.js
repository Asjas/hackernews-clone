'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const bcryptjs_1 = __importDefault(require('bcryptjs'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const utils_1 = require('../utils');
const Mutations = {
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcryptjs_1.default.hash(args.password, 10);
    const user = await ctx.prisma.createUser({
      ...args,
      password,
    });
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, utils_1.APP_SECRET);
    return { token, user };
  },
  async login(parent, args, ctx, info) {
    const user = await ctx.prisma.user({ email: args.email });
    if (!user) {
      throw new Error('No such user found!');
    }
    const valid = await bcryptjs_1.default.compare(args.password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, utils_1.APP_SECRET);
    return { token, user };
  },
  async post(parent, args, ctx, info) {
    const userId = utils_1.getUserId(ctx);
    const Link = await ctx.prisma.createLink({
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    });
    return Link;
  },
  async vote(parent, args, ctx, info) {
    const userId = utils_1.getUserId(ctx);
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
exports.default = Mutations;
//# sourceMappingURL=Mutation.js.map
