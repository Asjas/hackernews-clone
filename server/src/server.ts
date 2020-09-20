// @ts-nocheck

import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import GQL from 'fastify-gql';
import cors from 'fastify-cors';
import helmet from 'fastify-helmet';
import fastifySentry from 'fastify-sentry';
import { PrismaClient } from '@prisma/client';
import resolvers from './resolvers';
import { schema } from './schema';

const prisma = new PrismaClient();

function createServer() {
  const server = fastify({
    logger: true,
  });

  server.register(helmet);

  server.register(cors, {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  server.register(fastifySentry, {
    dsn: 'https://60d9614f331c4cc4b67ec05a9f0b1926@o183318.ingest.sentry.io/5426327',
    environment: process.env.NODE_ENV,
    errorHandler: (err: any, _request: FastifyRequest, reply: FastifyReply) => {
      server.log.error(err.toString());

      reply.send({
        payload: err,
      });
    },
  });

  server.register(GQL, {
    schema,
    resolvers,
    jit: 1,
    subscription: {
      context: (_con, request) => {
        return {
          ...request,
          prisma,
        };
      },
    },
    graphiql: process.env.NODE_ENV !== 'production' && 'playground',
    persistedQueryProvider: GQL.persistedQueryDefaults.automatic(),
    context: (request, _reply) => {
      return {
        ...request,
        prisma,
      };
    },
  });

  return server;
}

export default createServer;
