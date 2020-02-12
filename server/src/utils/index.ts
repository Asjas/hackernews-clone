import * as jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
  request: any;
}

export function getUserId(ctx: Context) {
  const Authorization: string = ctx['headers'].authorization;
  const { APP_SECRET } = process.env;

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET) as { userId: number };

    return userId;
  }

  throw new Error('Not authenticated');
}
