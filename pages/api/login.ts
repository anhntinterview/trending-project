// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { AppDataSource } from "@root/data-source";
import { Test, RelatedTest } from '@db/entity/test.entity';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    await AppDataSource.initialize();
    const testRepo = await AppDataSource.getRepository(Test)
    const t = await testRepo.find();
    await AppDataSource.destroy()
    res.status(200).json(t)
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}
