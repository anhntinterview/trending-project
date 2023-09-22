// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import CustomerModule from '@/customer/customer.module';
import { withAllowCors } from '../withUtil';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // withAllowCors(req, res, async () => {
  // const customerModule = new CustomerModule(req, res);
  // if (req.method === 'GET') {
  //   await customerModule.crudModule.getOne();
  // } else if (req.method === 'POST') {
  //   // await customerModule.crudModule.createOne();
  //   res.status(200).json({ msg: 'POST here' });
  // }
  // });
}
