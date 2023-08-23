import CustomerController from './customer.controller';
import { Container } from 'typedi';
import { CustomersDTO } from './customer.dto';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiOperationProvider from '@/core/provider/api-operation.provider';
import { isNotVoid } from '@/util/type';
import { Customer } from '@db/entity/customer.entity';
import { CustomerAddress } from '@db/entity/customer-address.entity';

class CustomerModule<T> {
  private customerController = Container.get(CustomerController<T>);
  private readonly apiOperationProvider = Container.get(ApiOperationProvider<T>);

  constructor(private readonly req: NextApiRequest, private readonly res: NextApiResponse<T>) {}

  async getAll() {
    await this.apiOperationProvider.initialize(this.req, this.res);
    if (isNotVoid<T>) {
      await this.apiOperationProvider.execute(() => this.customerController.all(this.req, this.res) as Promise<T>);
    }
  }

  async getOne(customerId: string) {
    await this.apiOperationProvider.initialize(this.req, this.res);
    if (isNotVoid<T>) {
      await this.apiOperationProvider.execute(
        () => this.customerController.findOne(customerId, this.req, this.res) as Promise<T>
      );
    }
  }

  async createOne(customerData: Customer) {
    await this.apiOperationProvider.initialize(this.req, this.res);
    if (isNotVoid<T>) {
      await this.apiOperationProvider.execute(
        () => this.customerController.createOne(customerData, this.req, this.res) as Promise<T>
      );
    }
  }

  async createMany(customersData: Customer[], customerAddressesData: CustomerAddress[]) {
    await this.apiOperationProvider.initialize(this.req, this.res);
    if (isNotVoid<T>) {
      await this.apiOperationProvider.execute(
        () => this.customerController.createMany(customersData, this.req, this.res) as Promise<T>
      );
    }
  }

  async updateOne(customerId: string, customerData: Customer) {
    await this.apiOperationProvider.initialize(this.req, this.res);
    if (isNotVoid<T>) {
      await this.apiOperationProvider.execute(
        () => this.customerController.updateOne(customerId, customerData, this.req, this.res) as Promise<T>
      );
    }
  }

  async updateMany(customersId: string[], customersData: Customer[]) {
    await this.apiOperationProvider.initialize(this.req, this.res);
    if (isNotVoid<T>) {
      await this.apiOperationProvider.execute(
        () => this.customerController.updateMany(customersId, customersData, this.req, this.res) as Promise<T>
      );
    }
  }

  async deleteOne(customerId: string) {
    await this.apiOperationProvider.initialize(this.req, this.res);
    if (isNotVoid<T>) {
      await this.apiOperationProvider.execute(
        () => this.customerController.deleteOne(customerId, this.req, this.res) as Promise<T>
      );
    }
  }

  async deleteMany(customersId: string[]) {
    await this.apiOperationProvider.initialize(this.req, this.res);
    if (isNotVoid<T>) {
      await this.apiOperationProvider.execute(
        () => this.customerController.deleteMany(customersId, this.req, this.res) as Promise<T>
      );
    }
  }

  async main() {
    await this.getAll();
  }
}

export default CustomerModule;
