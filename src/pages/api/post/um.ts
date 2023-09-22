// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import PostModule from '@/post/post.module';
import { Post } from '@db/entity/post.entity';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Post[]>) {
  const postModule = new PostModule(req, res);
  await postModule.crudModule.updateMany();
}
