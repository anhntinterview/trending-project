import { Container, Service } from 'typedi';
import { DeleteResult } from 'typeorm';
import { EntityError } from '@/util/type';
import { GetOneByAttribute } from '@root/type/entity/common';
import CustomerAddressService from './customer-address.service';
import { CustomerAddress } from '@db/entity/customer-address.entity';

@Service()
class CustomerAddressController<T> {
  private customerAddressService = Container.get(CustomerAddressService<T>);

  constructor() {}

  async deleteOne(id: string): Promise<void | T | DeleteResult> {
    return await this.customerAddressService.deleteOne(id);
  }

  async deleteMany(ids: string[]): Promise<void | T | DeleteResult> {
    return await this.customerAddressService.deleteMany(ids);
  }
}

export default CustomerAddressController;
