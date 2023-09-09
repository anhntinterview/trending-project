// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import CustomerModule from '@/customer/customer.module';
import { Customer } from '@db/entity/customer.entity';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Customer>) {
  const customerModule = new CustomerModule<Customer>(req, res);
  await customerModule.getOne()
}
