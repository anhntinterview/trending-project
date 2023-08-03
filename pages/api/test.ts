// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { AppDataSource } from "@root/data-source";
import TestModule from '@/test/test.module';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if(req.method === "GET") {
    try {
      await AppDataSource.initialize();
      const testModule = new TestModule();
      const t = await testModule.getAll()
      await AppDataSource.destroy()
      res.status(200).json(t)
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    // 405 Method Not Allowed
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
