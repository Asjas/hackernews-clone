'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
exports.APP_SECRET = 'GraphQL-is-aw3some';
function getUserId(ctx) {
  const Authorization = ctx.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const userId = jsonwebtoken_1.default.verify(token, exports.APP_SECRET);
    return userId;
  }
  throw new Error('Not authenticated');
}
exports.getUserId = getUserId;
//# sourceMappingURL=index.js.map
