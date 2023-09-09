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
