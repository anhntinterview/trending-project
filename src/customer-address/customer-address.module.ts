import { NextApiRequest, NextApiResponse } from 'next';
import CRUDModule from '@/core/service/crud/crud.module';
import ApiProvider from '@/core/provider/singleton/api.provider';
import CustomerRepository from '@/customer/customer.repository';
import CustomerAddressRepository from '@/customer-address/customer-address.repository';
import { CustomeObjectLiteral } from '@root/type/entity/common';

class CustomerAddressModule<
  CustomerAddress extends CustomeObjectLiteral,
  Customer extends CustomeObjectLiteral
> extends ApiProvider {
  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
  }
  public crudModule = new CRUDModule<CustomerAddress, Customer>(
    this.req,
    this.res,
    CustomerAddressRepository,
    CustomerRepository,
    'address',
    'customers'
  );
}

export default CustomerAddressModule;
