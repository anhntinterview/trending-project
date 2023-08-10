// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import TestModule from '@/test/test.module';
import { TestsDTO } from '@/test/test.dto';

export default async function handler(req: NextApiRequest, res: NextApiResponse<TestsDTO>) {
  const testModule = new TestModule<TestsDTO>(req, res);
  await testModule.main();  
}
