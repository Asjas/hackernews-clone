import { FastifyRequest } from 'fastify';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

export const APP_SECRET = process.env.APP_SECRET;

export interface Context {
  prisma: PrismaClient;
  raw: FastifyRequest;
  pubsub: any;
}

export function getUserId(ctx: Context) {
  const Authorization = ctx?.raw?.headers?.authorization;
  const { APP_SECRET } = process.env;

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET) as { userId: number };

    return userId;
  }

  throw new Error('Not authenticated! Please log in.');
}
