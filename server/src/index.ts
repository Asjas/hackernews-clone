import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { importSchema } from 'graphql-import';

require('dotenv').config({ path: `${__dirname}/.env` });

import { prisma } from './generated/prisma-client';
import * as typeDefs from './schema.graphql';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import Link from './resolvers/Link';
import User from './resolvers/User';
import Vote from './resolvers/Vote';

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
      'editor.fontSize': 16,
    },
  },
  introspection: true,
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
