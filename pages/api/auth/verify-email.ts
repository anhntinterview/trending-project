// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import AuthModule from '@/authentication/auth.module';
import { useRouter } from 'next/router';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authModule = new AuthModule(req, res);
  await authModule.verifyEmail();
  res.redirect('/');
}
