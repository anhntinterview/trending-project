import { Container } from 'typedi';
import { NextApiRequest, NextApiResponse } from 'next';
import CustomerController from '@/customer/customer.controller';
import { Customer } from '@db/entity/customer.entity';
import ApiOperationBase from '@/core/provider/api-operation.base';
import ApiProvider from '@/core/provider/singleton/api.provider';

class CustomerModule<T> extends ApiOperationBase<T> {
  constructor(protected readonly req: NextApiRequest, protected readonly res: NextApiResponse<T>) {
    super(req, res);
  }

  private customerController = Container.get(CustomerController<T>);
  private readonly apiProvider = new ApiProvider<T>(this.req, this.res);

  async getAll() {
    await this.apiProvider.handleHttpRequestResponse(
      'get', // method
      () => this.customerController.all() // callback
    );
  }

  async getOne() {
    await this.apiProvider.handleHttpRequestResponse(
      'get', // method
      (id) => this.customerController.findOne(id as string), // callback
      true // hasParam
    );
  }

  async createOne() {
    await this.apiProvider.handleHttpRequestResponse(
      'post', // method
      (undefined, bodyData) => this.customerController.createOne(bodyData as Customer), // callback
      false, // hasParam
      true, // hasBodyData
      true // isValidate
    );
  }

  async createMany() {
    await this.apiProvider.handleHttpRequestResponse(
      'post',
      (undefined, bodyData) => this.customerController.createMany(bodyData as Customer[]), // callback
      false, // hasParam
      true, // hasBodyData
      true, // isValidate
    );
  }

  async updateOne() {
    await this.apiProvider.handleHttpRequestResponse(
      'put', // method
      (id, bodyData) => this.customerController.updateOne(id as string, bodyData as Customer), // callback
      false, // hasParam
      true, // hasBodyData
      true // isValidate
    );
  }

  async updateMany() {
    await this.apiProvider.handleHttpRequestResponse(
      'put', // method
      (ids, bodyData) => this.customerController.updateMany(ids as Array<string>, bodyData as Customer[]), // callback
      false, // hasParam
      true, // hasBodyData
      true // isValidate
    );
  }

  async deleteOne() {
    await this.apiProvider.handleHttpRequestResponse(
      'delete', // method
      (id) => this.customerController.deleteOne(id as string), // callback
      false, // hasParam
      true, // hasBodyData
    );
  }

  async deleteMany(customersId: string[]) {
    await this.apiProvider.handleHttpRequestResponse(
      'delete', // method
      (ids) => this.customerController.deleteMany(ids as Array<string>), // callback
      false, // hasParam
      true, // hasBodyData
    );
  }
}

export default CustomerModule;
