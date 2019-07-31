'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const Vote = {
  async link(parent, args, ctx, info) {
    ctx.prisma.vote({ id: parent.id }).link();
  },
  async user(parent, args, ctx, info) {
    ctx.prisma.vote({ id: parent.id }).user();
  },
};
exports.default = Vote;
//# sourceMappingURL=Vote.js.map
