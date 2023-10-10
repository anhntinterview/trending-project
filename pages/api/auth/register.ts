// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import AuthModule from '@/authentication/auth.module';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authModule = new AuthModule(req, res);
  return await authModule.register();
}
