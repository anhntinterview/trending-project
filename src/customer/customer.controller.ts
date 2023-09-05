import { Container, Service } from 'typedi';
import { DeleteResult } from 'typeorm';
import CustomerService from '@/customer/customer.service';
import { Customer } from '@db/entity/customer.entity';
import { EntityError } from '@/util/type';
import { GetOneByAttribute } from '@root/type/entity/common';

@Service()
class CustomerController<T> {
  private customerService = Container.get(CustomerService<T>);

  constructor() {}

  async findOneByAttribute(bodyData: GetOneByAttribute): Promise<T> {
    return (await this.customerService.findOneByAttribute(bodyData)) as T;
  }

  async all(): Promise<T> {
    return await this.customerService.all();
  }

  async findOne(id: string) {
    await this.customerService.findOne(id);
  }

  async createOne(bodyData: Customer): Promise<T> {
    return await this.customerService.createOne(bodyData);
  }

  async createMany(bodyData: Customer[]): Promise<T> {
    return await this.customerService.createMany(bodyData);
  }

  async updateOne(bodyData: Customer): Promise<T | EntityError> {
    return await this.customerService.updateOne(bodyData);
  }

  async updateMany(bodyData: Customer[]): Promise<T | EntityError | undefined> {
    return await this.customerService.updateMany(bodyData);
  }

  async deleteOne(id: string): Promise<void | T | DeleteResult> {
    return await this.customerService.deleteOne(id);
  }

  async deleteMany(ids: string[]): Promise<void | T | DeleteResult> {
    return await this.customerService.deleteMany(ids);
  }
}

export default CustomerController;
