// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import CustomerSessionModule from '@/customer-session/customer-session.module';
import { CustomerSession } from '@db/entity/customer-session.entity';

export default async function handler(req: NextApiRequest, res: NextApiResponse<CustomerSession>) {
  const customerSessionModule = new CustomerSessionModule<CustomerSession>(req, res);
  await customerSessionModule.deleteMany();
}
