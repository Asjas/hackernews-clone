const Koa = require('koa');
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server-koa');
const { importSchema } = require('graphql-import');

require('dotenv').config({ path: `${__dirname}/.env` });

const { prisma } = require('./generated/prisma-client');
const typeDefs = importSchema(`${__dirname}/schema.graphql`);
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const Link = require('./resolvers/Link');
const User = require('./resolvers/User');
const Vote = require('./resolvers/Vote');

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
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
      'editor.fontSize': '16',
      'prettier.printWidth': 100,
    },
  },
  context: ({ ctx }) => ({
    ...ctx,
    prisma,
  }),
});

const app = new Koa();
server.applyMiddleware({ app });

const httpServer = app.listen({ port: 4000 }, () =>
  console.log(`✔️ Server ready at http://localhost:4000${server.graphqlPath}`),
);

server.installSubscriptionHandlers(httpServer);
