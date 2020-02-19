import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

dotenv.config();

import resolvers from './resolvers';
import { typeDefs } from './schema';

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    credentials: true,
    origin: ['http://localhost:3000'],
  },
  playground: {
    settings: {
      'editor.cursorShape': 'underline',
      'editor.fontFamily': "'Operator Mono', 'Source Code Pro', 'Consolas', 'Inconsolata'",
      'editor.fontSize': 16,
    },
  },
  cacheControl: {
    defaultMaxAge: 60,
  },
  tracing: true,
  introspection: true,
  context: ({ req }) => ({
    ...req,
    prisma,
  }),
});

server.listen().then(({ url }) => {
  console.log(`✔️ Server ready at ${url}`);
});

//catches ctrl+c event
process.on('SIGINT', function() {
  prisma.disconnect();
  process.exit(1);
});

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', function() {
  prisma.disconnect();
  process.exit(1);
});
process.on('SIGUSR2', function() {
  prisma.disconnect();
  process.exit(1);
});

//catches uncaught exceptions
process.on('uncaughtException', function() {
  prisma.disconnect();
  process.exit(1);
});
