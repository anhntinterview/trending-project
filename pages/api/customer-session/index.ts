// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import CustomerSessionModule from '@/customer-session/customer-session.module';
import { CustomersSessionDTO } from '@/customer-session/customer-session.dto';

export default async function handler(req: NextApiRequest, res: NextApiResponse<CustomersSessionDTO>) {
  const customerModule = new CustomerSessionModule<CustomersSessionDTO>(req, res);
  await customerModule.getAll();
}
