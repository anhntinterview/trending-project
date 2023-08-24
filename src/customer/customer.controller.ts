import { Container, Service } from 'typedi';
import { DeleteResult } from 'typeorm';
import CustomerService from '@/customer/customer.service';
import { Customer } from '@db/entity/customer.entity';


@Service()
class CustomerController<T> {
  private customerService = Container.get(CustomerService<T>);

  constructor() {}

  async all(): Promise<T> {
    return await  this.customerService.all();
  }

  async findOne(id: string): Promise<T> {
    return await this.customerService.findOne(id);
  }

  async createOne(bodyData: Customer): Promise<T> {
    return await this.customerService.createOne(bodyData);
  }

  async createMany(
    bodyData: Customer[],
  ): Promise<T> {
    return await this.customerService.createMany(bodyData);
  }

  async updateOne(
    id: string,
    bodyData: Customer,
  ): Promise<void | T> {
    return await this.customerService.updateOne(id, bodyData);
  }

  async updateMany(
    ids: string[],
    bodyData: Customer[],
  ): Promise<void | T> {
    return await this.customerService.updateMany(ids, bodyData);
  }

  async deleteOne(id: string): Promise<void | T | DeleteResult> {
    return await this.customerService.deleteOne(id);
  }

  async deleteMany(ids: string[]): Promise<void | T> {
    return await this.customerService.deleteMany(ids);
  }
}

export default CustomerController;
