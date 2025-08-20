import { auth0 } from '@/lib/auth0';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  return await auth0.middleware(req);
};

export const POST = async (req: NextRequest) => {
  return await auth0.middleware(req);
};
