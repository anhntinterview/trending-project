// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import PostModule from '@/post/post.module';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const postModule = new PostModule(req, res);
  await postModule.createOne();
}
