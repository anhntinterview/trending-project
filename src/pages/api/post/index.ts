// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import PostModule from '@/post/post.module';
import { PostsDTO } from '@/post/post.dto';
import AuthModule from '@/authentication/auth.module';

export default async function handler(req: NextApiRequest, res: NextApiResponse<PostsDTO>) {
  // const authModule = new AuthModule(req, res);

  // await authModule.isAuth(async () => {
  //   const postModule = new PostModule<PostsDTO>(req, res);
  //   return await postModule.getAll();
  // });

  const postModule = new PostModule(req, res);
  return await postModule.crudModule.getAll();
}
