import { NextApiRequest, NextApiResponse } from 'next';
import { Container, Service } from 'typedi';
import { CustomerRO, CustomersDTO } from './customer.dto';
import CustomerService from './customer.service';
import MethodProvider from '@/core/provider/method.provider';
import { Customer } from '@db/entity/customer.entity';
import { CustomerAddress } from '@db/entity/customer-address.entity';
import { DeleteResult } from 'typeorm';

@Service()
class CustomerController<T> {
  private customerService = Container.get(CustomerService<T>);
  private readonly methodProvider = Container.get(MethodProvider<T>);

  constructor() {}

  async all(req: NextApiRequest, res: NextApiResponse<T>): Promise<void | T> {
    await this.methodProvider.initialize(req, res);
    return await this.methodProvider.get(() => this.customerService.all());
  }

  async findOne(customerId: number, req: NextApiRequest, res: NextApiResponse<T>): Promise<void | T> {
    await this.methodProvider.initialize(req, res);
    return await this.methodProvider.get(() => this.customerService.findOne(customerId));
  }

  async createOne(
    customerData: Customer,
    customerAddressData: CustomerAddress,
    req: NextApiRequest,
    res: NextApiResponse<T>
  ): Promise<void | T> {
    await this.methodProvider.initialize(req, res);
    return await this.methodProvider.post(() => this.customerService.createOne(customerData, customerAddressData));
  }

  async createMany(
    customersData: Customer[],
    customerAddressesData: CustomerAddress[],
    req: NextApiRequest,
    res: NextApiResponse<T>
  ): Promise<void | T> {
    await this.methodProvider.initialize(req, res);
    return await this.methodProvider.post(() => this.customerService.createMany(customersData, customerAddressesData));
  }

  async updateOne(
    customerId: number,
    customerData: Customer,
    req: NextApiRequest,
    res: NextApiResponse<T>
  ): Promise<void | T> {
    await this.methodProvider.initialize(req, res);
    return await this.methodProvider.put(() => this.customerService.updateOne(customerId, customerData));
  }

  async updateMany(
    customersId: number[],
    customersData: Customer[],
    req: NextApiRequest,
    res: NextApiResponse<T>
  ): Promise<void | T> {
    await this.methodProvider.initialize(req, res);
    return await this.methodProvider.put(() => this.customerService.updateMany(customersId, customersData));
  }

  async deleteOne(customerId: number, req: NextApiRequest, res: NextApiResponse<T>): Promise<void | DeleteResult> {
    await this.methodProvider.initialize(req, res);
    return await this.methodProvider.delete(() => this.customerService.deleteOne(customerId));
  }

  async deleteMany(customersId: number[], req: NextApiRequest, res: NextApiResponse<T>): Promise<void | DeleteResult> {
    await this.methodProvider.initialize(req, res);
    return await this.methodProvider.delete(() => this.customerService.deleteMany(customersId));
  }
}

export default CustomerController;
