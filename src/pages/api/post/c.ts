// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import PostModule from '@/post/post.module';
import { PostBodyDataValidation } from '@/post/post.type';
import { Post } from '@db/entity/post.entity';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const postModule = new PostModule(req, res);
  await postModule.createOneWithMiddlware();
}
