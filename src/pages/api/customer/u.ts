// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import CustomerModule from '@/customer/customer.module';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const customerModule = new CustomerModule(req, res);
  await customerModule.crudModule.updateOne();
}
