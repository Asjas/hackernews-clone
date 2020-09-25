import { FastifyInstance } from 'fastify';

export default (fastify: FastifyInstance, _, next: (error?: Error) => void) => {
  fastify.get('/health', (_, reply) => {
    reply.code(200).send({ status: 'ok' });
  });

  next();
};
