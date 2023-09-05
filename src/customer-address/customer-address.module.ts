import { Container } from 'typedi';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiOperationBase from '@/core/provider/api-operation.base';
import ApiProvider, { APIParameterType } from '@/core/provider/singleton/api.provider';
import { GetOneByAttribute } from '@root/type/entity/common';
import CustomerAddressController from './customer-address.controller';
import { CustomerAddress } from '@db/entity/customer-address.entity';

class CustomerAddressModule<T> extends ApiOperationBase<T> {
  constructor(protected readonly req: NextApiRequest, protected readonly res: NextApiResponse<T>) {
    super(req, res);
  }

  private customerAddressController = Container.get(CustomerAddressController<T>);
  private readonly apiProvider = new ApiProvider<T>(this.req, this.res);

  async getOneByAttribute() {
    return await this.apiProvider.handleHttpRequestResponse(
      'post', // method
      (undefined, bodyData) => this.customerAddressController.findOneByAttribute(bodyData as GetOneByAttribute), // callback
      APIParameterType.BODY_DATA
    );
  }

  async getAll() {
    return await this.apiProvider.handleHttpRequestResponse(
      'get', // method
      () => this.customerAddressController.all() // callback
    );
  }

  async getOne() {
    return await this.apiProvider.handleHttpRequestResponse(
      'get', // method
      (id) => this.customerAddressController.findOne(id as string), // callback
      APIParameterType.URL_PARAM
    );
  }

  async createOne() {
    return await this.apiProvider.handleHttpRequestResponse(
      'post', // method
      (undefined, bodyData: CustomerAddress) => this.customerAddressController.createOne(bodyData), // callback
      APIParameterType.BODY_DATA
    );
  }

  async createMany() {
    return await this.apiProvider.handleHttpRequestResponse(
      'post',
      (undefined, bodyData: CustomerAddress[]) => this.customerAddressController.createMany(bodyData), // callback
      APIParameterType.BODY_DATA
    );
  }

  async updateOne() {
    return await this.apiProvider.handleHttpRequestResponse(
      'put', // method
      (undefined, bodyData: CustomerAddress) => this.customerAddressController.updateOne(bodyData), // callback
      APIParameterType.BODY_DATA
    );
  }

  async updateMany() {
    return await this.apiProvider.handleHttpRequestResponse(
      'put', // method
      (undefined, bodyData: CustomerAddress[]) => this.customerAddressController.updateMany(bodyData), // callback
      APIParameterType.BODY_DATA
    );
  }

  async deleteOne() {
    return await this.apiProvider.handleHttpRequestResponse(
      'delete', // method
      (id: string) => this.customerAddressController.deleteOne(id), // callback
      APIParameterType.URL_PARAM
    );
  }

  async deleteMany() {
    return await this.apiProvider.handleHttpRequestResponse(
      'post', // method
      (undefined, bodyData: string[]) => this.customerAddressController.deleteMany(bodyData), // callback
      APIParameterType.BODY_DATA
    );
  }
}

export default CustomerAddressModule;
