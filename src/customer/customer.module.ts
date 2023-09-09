import { Container } from 'typedi';
import { NextApiRequest, NextApiResponse } from 'next';
import CustomerController from '@/customer/customer.controller';
import { Customer } from '@db/entity/customer.entity';
import ApiOperationBase from '@/core/provider/api-operation.base';
import ApiProvider, { APIParameterType } from '@/core/provider/singleton/api.provider';
import { GetOneByAttribute } from '@root/type/entity/common';

class CustomerModule<T> extends ApiOperationBase<T> {
  constructor(protected readonly req: NextApiRequest, protected readonly res: NextApiResponse<T>) {
    super(req, res);
  }

  private customerController = Container.get(CustomerController<T>);
  private readonly apiProvider = new ApiProvider<T>(this.req, this.res);

  async getOneByAttribute() {
    return await this.apiProvider.handleHttpRequestResponse(
      'post', // method
      (undefined, bodyData) => this.customerController.findOneByAttribute(bodyData as GetOneByAttribute), // callback
      APIParameterType.BODY_DATA
    );
  }

  async getAll() {
    return await this.apiProvider.handleHttpRequestResponse(
      'get', // method
      () => this.customerController.all() // callback
    );
  }

  async getOne() {
    return await this.apiProvider.handleHttpRequestResponse(
      'get', // method
      (id) => this.customerController.findOne(id as string), // callback
      APIParameterType.URL_PARAM
    );
  }

  async createOne() {
    return await this.apiProvider.handleHttpRequestResponse(
      'post', // method
      (undefined, bodyData: Customer) => this.customerController.createOne(bodyData), // callback
      APIParameterType.BODY_DATA
    );
  }

  async createMany() {
    return await this.apiProvider.handleHttpRequestResponse(
      'post',
      (undefined, bodyData: Customer[]) => this.customerController.createMany(bodyData), // callback
      APIParameterType.BODY_DATA
    );
  }

  async updateOne() {
    return await this.apiProvider.handleHttpRequestResponse(
      'put', // method
      (undefined, bodyData: Customer) => this.customerController.updateOne(bodyData), // callback
      APIParameterType.BODY_DATA
    );
  }

  async updateMany() {
    return await this.apiProvider.handleHttpRequestResponse(
      'put', // method
      (undefined, bodyData: Customer[]) => this.customerController.updateMany(bodyData), // callback
      APIParameterType.BODY_DATA
    );
  }

  async deleteOne() {
    return await this.apiProvider.handleHttpRequestResponse(
      'delete', // method
      (id: string) => this.customerController.deleteOne(id), // callback
      APIParameterType.URL_PARAM
    );
  }

  async deleteMany() {
    return await this.apiProvider.handleHttpRequestResponse(
      'post', // method
      (undefined, bodyData: string[]) => this.customerController.deleteMany(bodyData), // callback
      APIParameterType.BODY_DATA
    );
  }
}

export default CustomerModule;
