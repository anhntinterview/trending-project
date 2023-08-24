import { CustomerAddress } from '@db/entity/customer-address.entity';
import { Customer } from '@db/entity/customer.entity';
import { Service } from 'typedi';
import { validate } from 'class-validator';
import { NextApiRequest, NextApiResponse } from 'next';
import { DeleteResult, Repository } from 'typeorm';
import CustomerRepository from './customer.repository';
import { MapErrorType } from '@/util/type';

@Service()
class CustomerService<T> {
  constructor() {}

  private customerRepository: Repository<Customer> = CustomerRepository;

  // return type of Promise<CustomersDTO>
  async all(): Promise<T> {
    const qbCustomer = await this.customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.addresses', 'addresses');

    const countCustomer = await qbCustomer.getCount();
    const listCustomer = await qbCustomer.getMany();

    return { countCustomer, listCustomer } as T;
  }

  // return type of Promise<Customer>
  async findOne(id: string): Promise<T> {
    return (await this.customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.addresses', 'addresses')
      .where('customer.id = :id', { id })
      .getOne()) as T;
  }

  // return type of Promise<Customer>
  async createOne(bodyData: Customer): Promise<T> {
    return (await this.customerRepository.save(bodyData)) as T;
  }

  // return type of Promise<Customer[]>
  async createMany(bodyData: Customer[]): Promise<T> {
    return await this.customerRepository.save(bodyData) as T;
  }

  // return type of Promise<Customer | undefined>
  async updateOne(customerId: string, customerData: Customer): Promise<T | undefined> {
    let toUpdate = await this.customerRepository.findOne({
      where: { id: customerId },
      relations: ['addresses']
    });
    if (toUpdate) {
      let updated = Object.assign(toUpdate, customerData);
      return (await this.customerRepository.save(updated)) as T;
    }
  }

  async updateMany(customersId: string[], customersData: Customer[]): Promise<void> {
    customersId.map(async (ci) => {
      customersData.map(async (c) => {
        return await this.updateOne(ci, c);
      });
    });
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    return await this.customerRepository.delete({ id });
  }

  async deleteMany(ids: string[]) {
    ids.map(async (ci) => {
      return await this.customerRepository.delete({ id: ci });
    });
  }
}

export default CustomerService;
