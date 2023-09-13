// import CustomerController from '@/customer/customer.controller';
import { NextApiRequest, NextApiResponse } from 'next';
import CRUDModule from '@/core/service/crud/crud.module';
import ApiProvider from '@/core/provider/singleton/api.provider';
import CustomerRepository from './customer.repository';
import CustomerAddressRepository from '@/customer-address/customer-address.repository';
import Container from 'typedi';
import { CustomeObjectLiteral } from '@root/type/entity/common';

class CustomerModule<
  Customer extends CustomeObjectLiteral,
  CustomerAddress extends CustomeObjectLiteral
> extends ApiProvider {
  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
  }
  public crudModule = new CRUDModule<Customer, CustomerAddress>(
    this.req,
    this.res,
    CustomerRepository,
    CustomerAddressRepository,
    'customer',
    'addresses'
  );
  // private customerController = Container.get(CustomerController<Customer, CustomerAddress>);
}

export default CustomerModule;

// class CustomerModule<T> extends ApiProvider<T> {
//   constructor(req: NextApiRequest, res: NextApiResponse<T>) {
//     super(req, res);
//   }

//   private customerController = Container.get(CustomerController<T>);

//   async getOneByAttribute() {
//     return await this.handleHttpRequestResponse(
//       APIMethodType.POST, // method
//       (undefined, bodyData: GetOneByAttribute) => this.customerController.findOneByAttribute(bodyData), // callback
//       APIParameterType.BODY_DATA
//     );
//   }

//   async getAll() {
//     return await this.handleHttpRequestResponse(
//       APIMethodType.GET, // method
//       () => this.customerController.all() // callback
//     );
//   }

//   async getOne() {
//     return await this.handleHttpRequestResponse(
//       APIMethodType.GET, // method
//       (id) => this.customerController.findOne(id as string), // callback
//       APIParameterType.URL_PARAM
//     );
//   }

//   async createOne() {
//     return await this.handleHttpRequestResponse(
//       APIMethodType.POST, // method
//       (undefined, bodyData: Customer) => this.customerController.createOne(bodyData), // callback
//       APIParameterType.BODY_DATA
//     );
//   }

//   async createMany() {
//     return await this.handleHttpRequestResponse(
//       APIMethodType.POST,
//       (undefined, bodyData: Customer[]) => this.customerController.createMany(bodyData), // callback
//       APIParameterType.BODY_DATA
//     );
//   }

//   async updateOne() {
//     return await this.handleHttpRequestResponse(
//       APIMethodType.PUT, // method
//       (undefined, bodyData: Customer) => this.customerController.updateOne(bodyData), // callback
//       APIParameterType.BODY_DATA
//     );
//   }

//   async updateMany() {
//     return await this.handleHttpRequestResponse(
//       APIMethodType.PUT, // method
//       (undefined, bodyData: Customer[]) => this.customerController.updateMany(bodyData), // callback
//       APIParameterType.BODY_DATA
//     );
//   }

//   async deleteOne() {
//     return await this.handleHttpRequestResponse(
//       APIMethodType.DELETE, // method
//       (id: string) => this.customerController.deleteOne(id), // callback
//       APIParameterType.URL_PARAM
//     );
//   }

//   async deleteMany() {
//     return await this.handleHttpRequestResponse(
//       APIMethodType.POST, // method
//       (undefined, bodyData: string[]) => this.customerController.deleteMany(bodyData), // callback
//       APIParameterType.BODY_DATA
//     );
//   }
// }

// export default CustomerModule;
