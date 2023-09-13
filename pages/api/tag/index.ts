// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import TagModule from '@/tag/tag.module';
import { TagsDTO } from '@/tag/tag.dto';
import AuthModule from '@/authentication/auth.module';

export default async function handler(req: NextApiRequest, res: NextApiResponse<TagsDTO>) {
  // const authModule = new AuthModule(req, res);

  // await authModule.isAuth(async () => {
  //   const tagModule = new TagModule<TagsDTO>(req, res);
  //   return await tagModule.getAll();
  // });

  const tagModule = new TagModule(req, res);
  return await tagModule.crudModule.getAll();
}
