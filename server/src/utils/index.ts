import * as jwt from 'jsonwebtoken';
import { Prisma } from '../generated/prisma-client';

export interface Context {
  prisma: Prisma;
  request: any;
}

export function getUserId(ctx: Context) {
  const Authorization: string = ctx.request.get('Authorization');
  const { APP_SECRET } = process.env;

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET) as { userId: string };

    return userId;
  }

  throw new Error('Not authenticated');
}
