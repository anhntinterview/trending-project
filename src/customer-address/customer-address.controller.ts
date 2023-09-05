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

  async findOneByAttribute(bodyData: GetOneByAttribute): Promise<T> {
    return (await this.customerAddressService.findOneByAttribute(bodyData)) as T;
  }

  async all(): Promise<T> {
    return await this.customerAddressService.all();
  }

  async findOne(id: string): Promise<T> {
    return await this.customerAddressService.findOne(id);
  }

  async createOne(bodyData: CustomerAddress): Promise<T> {
    return await this.customerAddressService.createOne(bodyData);
  }

  async createMany(bodyData: CustomerAddress[]): Promise<T> {
    return await this.customerAddressService.createMany(bodyData);
  }

  async updateOne(bodyData: CustomerAddress): Promise<T | EntityError> {
    return await this.customerAddressService.updateOne(bodyData);
  }

  async updateMany(bodyData: CustomerAddress[]): Promise<T | EntityError | undefined> {
    return await this.customerAddressService.updateMany(bodyData);
  }

  async deleteOne(id: string): Promise<void | T | DeleteResult> {
    return await this.customerAddressService.deleteOne(id);
  }

  async deleteMany(ids: string[]): Promise<void | T | DeleteResult> {
    return await this.customerAddressService.deleteMany(ids);
  }
}

export default CustomerAddressController;
