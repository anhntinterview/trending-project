// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import CustomerModule from '@/customer/customer.module';
import { CustomersDTO } from '@/customer/customer.dto';
import AuthModule from '@/authentication/auth.module';

export default async function handler(req: NextApiRequest, res: NextApiResponse<CustomersDTO>) {
  const authModule = new AuthModule(req, res);

  await authModule.isAuth(async () => {
    const customerModule = new CustomerModule<CustomersDTO>(req, res);
    return await customerModule.getAll();
  });

  // const customerModule = new CustomerModule<CustomersDTO>(req, res);
  // return await customerModule.getAll();
}
