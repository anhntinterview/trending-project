import { Container } from 'typedi';
import { NextApiRequest, NextApiResponse } from 'next';
import CustomerSessionController from '@/customer-session/customer-session.controller';
import ApiOperationBase from '@/core/provider/api-operation.base';
import { CustomerSession } from '@db/entity/customer-session.entity';
import ApiProvider, { APIParameterType } from '@/core/provider/singleton/api.provider';

class CustomerSessionModule<T> extends ApiOperationBase<T> {
  constructor(protected readonly req: NextApiRequest, protected readonly res: NextApiResponse<T>) {
    super(req, res);
  }

  private customerSessionController = Container.get(CustomerSessionController<T>);
  private readonly apiProvider = new ApiProvider<T>(this.req, this.res);

  async getAll() {
    await this.apiProvider.handleHttpRequestResponse(
      'get', // method
      () => this.customerSessionController.all() // callback
    );
  }

  async getOne() {
    await this.apiProvider.handleHttpRequestResponse(
      'get', // method
      (id) => this.customerSessionController.findOne(id as string), // callback
      APIParameterType.URL_PARAM
    );
  }

  async createOne() {
    await this.apiProvider.handleHttpRequestResponse(
      'post', // method
      (undefined, bodyData) => this.customerSessionController.createOne(bodyData as CustomerSession), // callback
      APIParameterType.BODY_DATA
    );
  }

  async createMany() {
    await this.apiProvider.handleHttpRequestResponse(
      'post',
      (undefined, bodyData) => this.customerSessionController.createMany(bodyData as CustomerSession[]), // callback
      APIParameterType.BODY_DATA
    );
  }

  async updateOne() {
    await this.apiProvider.handleHttpRequestResponse(
      'put', // method
      (undefined, bodyData) => this.customerSessionController.updateOne(bodyData as CustomerSession), // callback
      APIParameterType.BODY_DATA
    );
  }

  async updateMany() {
    await this.apiProvider.handleHttpRequestResponse(
      'put', // method
      (undefined, bodyData) => this.customerSessionController.updateMany(bodyData as CustomerSession[]), // callback
      APIParameterType.BODY_DATA
    );
  }

  // DELETE Method Url: /api/customer-session/d?id=67162838-ced6-4708-80bf-da563d38045e
  async deleteOne() {
    await this.apiProvider.handleHttpRequestResponse(
      'delete', // method
      (id) => this.customerSessionController.deleteOne(id as string), // callback
      APIParameterType.URL_PARAM
    );
  }

  async deleteMany() {
    await this.apiProvider.handleHttpRequestResponse(
      'post', // method
      (undefined, bodyData) => this.customerSessionController.deleteMany(bodyData as string[]), // callback
      APIParameterType.BODY_DATA
    );
  }
}

export default CustomerSessionModule;
