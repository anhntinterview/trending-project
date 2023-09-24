// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import LoggerModule from '@/logger/logger.module';
import { EnnvironmentDTO } from '@/logger/logger.dto';

export default async function handler(req: NextApiRequest, res: NextApiResponse<EnnvironmentDTO>) {
  const loggerModule = new LoggerModule(req, res);
  await loggerModule.getEnvironment();  
}
