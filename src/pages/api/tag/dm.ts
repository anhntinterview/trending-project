// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import TagModule from '@/tag/tag.module';
import { Tag } from '@db/entity/tag.entity';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Tag>) {
  const tagModule = new TagModule(req, res);
  await tagModule.crudModule.deleteMany();
}
