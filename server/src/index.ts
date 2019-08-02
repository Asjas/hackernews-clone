import Koa from 'koa';
import * as fs from 'fs';
import { ApolloServer, gql } from 'apollo-server-koa';
import { importSchema } from 'graphql-import';
import { prisma } from './generated/prisma-client';

import resolvers from './resolvers';
require('dotenv').config({ path: `${__dirname}/.env` });

import { typeDefs } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
