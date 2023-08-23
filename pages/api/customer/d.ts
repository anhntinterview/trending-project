// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import CustomerModule from '@/customer/customer.module';
import { CustomersDTO } from '@/customer/customer.dto';

export default async function handler(req: NextApiRequest, res: NextApiResponse<CustomersDTO>) {
  const customerModule = new CustomerModule<CustomersDTO>(req, res);
  const { customerData } = req.body;
  await customerModule.createOne(customerData);
}
