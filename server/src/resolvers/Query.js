const { forwardTo } = require('prisma-binding');

const Query = {
  async feed(parent, args, ctx, info) {
    return ctx.db.query.links();
  },
};

module.exports = Query;
