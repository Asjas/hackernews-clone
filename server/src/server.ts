// @ts-nocheck

import GQL from 'fastify-gql';
import cors from 'fastify-cors';
import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fastifySentry from 'fastify-sentry';
import helmet from 'fastify-helmet';
import noIcon from 'fastify-no-icon';
import { PrismaClient } from '@prisma/client';
import resolvers from './graphql/resolvers';
import schema from './graphql/schema';
import healthCheck from './services/health';

function createServer() {
  const prisma = new PrismaClient();

  const server = fastify({
    ignoreTrailingSlash: true,
    trustProxy: '127.0.0.1',
    logger: true,
  });

  server.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        connectSrc: ["'self'", 'https:'],
        fontSrc: ["'self'", 'https:', 'data:'],
        frameAncestors: ["'self'"],
        imgSrc: ["'self'", 'data:', 'http://cdn.jsdelivr.net', 'https://cdn.jsdelivr.net'],
        objectSrc: ["'self'"],
        frameSrc: ["'self'"],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'", 'http://cdn.jsdelivr.net', 'https://cdn.jsdelivr.net'],
        scriptSrc: ["'self'", "'unsafe-eval'", 'http://cdn.jsdelivr.net', 'https://cdn.jsdelivr.net'],
        scriptSrcAttr: ["'self'"],
      },
    },
  });

  server.register(noIcon);

  server.register(cors, {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  server.register(fastifySentry, {
    dsn: 'https://8a1b972b989d4a919b705a39b67ab5a2@o183318.ingest.sentry.io/5434925',
    environment: process.env.NODE_ENV,
    errorHandler: (err: any, _request: FastifyRequest, reply: FastifyReply) => {
      server.log.error(err.toString());

      reply.send({
        payload: err,
      });
    },
  });

  server.register(healthCheck);

  server.register(GQL, {
    schema,
    resolvers,
    graphiql: process.env.NODE_ENV !== 'production' && 'playground',
    jit: 1,
    queryDepth: 9,
    persistedQueryProvider: GQL.persistedQueryDefaults.automatic(),
    context: (request, _reply) => {
      return {
        ...request,
        prisma,
      };
    },
    subscription: {
      context: (_con, request) => {
        return {
          ...request,
          prisma,
        };
      },
    },
  });

  return server;
}

export default createServer;
