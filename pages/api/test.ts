// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import TestModule from '@/test/test.module';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const testModule = new TestModule(req, res);
  await testModule.main();  
}
