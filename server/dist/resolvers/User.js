'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const User = {
  async links(parent, args, ctx, info) {
    return await ctx.prisma.user({ id: parent.id }).links();
  },
};
exports.default = User;
//# sourceMappingURL=User.js.map
