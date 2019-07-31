'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const koa_1 = __importDefault(require('koa'));
const apollo_server_koa_1 = require('apollo-server-koa');
const graphql_import_1 = require('graphql-import');
require('dotenv').config({ path: `${__dirname}/.env` });
const prisma_client_1 = require('./generated/prisma-client');
const typeDefs = graphql_import_1.importSchema(`${__dirname}/schema.graphql`);
const Query_1 = __importDefault(require('./resolvers/Query'));
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const Link = require('./resolvers/Link');
const User = require('./resolvers/User');
const Vote = require('./resolvers/Vote');
const server = new apollo_server_koa_1.ApolloServer({
  typeDefs,
  resolvers: {
    Query: Query_1.default,
    Mutation,
    Subscription,
    Link,
    User,
    Vote,
  },
  playground: {
    settings: {
      'editor.cursorShape': 'underline',
      'editor.fontFamily': "'Operator Mono', 'Source Code Pro', 'Consolas', 'Inconsolata'",
      'editor.fontSize': 16,
    },
  },
  introspection: true,
  context: ({ ctx }) => ({
    ...ctx,
    prisma: prisma_client_1.prisma,
  }),
});
const app = new koa_1.default();
server.applyMiddleware({ app });
const httpServer = app.listen({ port: 4000 }, () =>
  console.log(`✔️ Server ready at http://localhost:4000${server.graphqlPath}`),
);
server.installSubscriptionHandlers(httpServer);
//# sourceMappingURL=index.js.map
