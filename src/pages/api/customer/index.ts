// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import CustomerModule from '@/customer/customer.module';
import { CustomersDTO } from '@/customer/customer.dto';
import AuthModule from '@/authentication/auth.module';
import { Customer } from '@db/entity/customer.entity';
import { CustomerAddress } from '@db/entity/customer-address.entity';
import { ObjectLiteral } from 'typeorm';
import { withAllowCors } from '../withUtil';
// import Cors from 'cors';

// const cors = Cors({
//   methods: ['POST', 'OPTIONS'] // Thêm 'OPTIONS' vào các phương thức được phép
// });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // await cors(req, res, () => {
  //   console.log(req.method);
  //   if (req.method === 'GET') {
  //     res.status(200).json({ msg: 'GET DONE' });
  //   } else if (req.method === 'POST') {
  //     const customer = req.body.bodyData;
  //     console.log(`customer: `, customer);
  //     res.status(200).json({ msg: 'POST DONE' });
  //   }
  // });

  // const authModule = new AuthModule(req, res);

  // await authModule.isAuth(async () => {
  //   const customerModule = new CustomerModule<CustomersDTO>(req, res);
  //   return await customerModule.getAll();
  // });

  // const customerModule = new CustomerModule(req, res);
  // return await customerModule.crudModule.getAll();

  await withAllowCors(req, res, async () => {
    const customerModule = new CustomerModule(req, res);
    console.log(req.method);
    if (req.method === 'GET') {
      await customerModule.crudModule.getAll();
    } else if (req.method === 'POST') {
      console.log('xxx');
      await customerModule.crudModule.createOne();
    }
  });
}
