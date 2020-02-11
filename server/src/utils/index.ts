import * as jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: any;
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
