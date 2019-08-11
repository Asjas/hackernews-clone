require('dotenv').config({ path: `${__dirname}/.env` });
import { ApolloServer } from 'apollo-server';
import { prisma } from './generated/prisma-client';
import resolvers from './resolvers';
import { typeDefs } from './schema';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    credentials: true,
    origin: '*',
  },
  playground: {
    settings: {
      'editor.cursorShape': 'underline',
      'editor.fontFamily': "'Operator Mono', 'Source Code Pro', 'Consolas', 'Inconsolata'",
      'editor.fontSize': 16,
    },
  },
  cacheControl: {
    defaultMaxAge: 600,
  },
  tracing: true,
  introspection: true,
  context: ({ req }) => ({
    ...req,
    prisma,
  }),
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`✔️ Server ready at ${url}`);
  console.log(`✔️ Subscriptions ready at ${subscriptionsUrl}`);
});
