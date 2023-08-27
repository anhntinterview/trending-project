import { CustomerAddress } from '@db/entity/customer-address.entity';
import { Customer } from '@db/entity/customer.entity';
import { Service } from 'typedi';
import { validate } from 'class-validator';
import { NextApiRequest, NextApiResponse } from 'next';
import { DeleteResult, In, Repository } from 'typeorm';
import CustomerRepository from './customer.repository';
import { EntityError, MapErrorType } from '@/util/type';

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
    return (await this.customerRepository.save(bodyData)) as T;
  }

  // return type of Promise<Customer | undefined>
  async updateOne(bodyData: Customer): Promise<T | EntityError> {
    // Step 1: Fetch the entity
    const toUpdate = await this.customerRepository.findOne({
      where: { id: bodyData.id }
    });

    if (!toUpdate) {
      return { errors: 'Query was failed!' }; // Entity not found
    }

    // Step 2: Modify the entity
    toUpdate.first_name = bodyData.first_name;
    toUpdate.last_name = bodyData.last_name;
    toUpdate.phone_number = bodyData.phone_number;
    toUpdate.email = bodyData.email;
    toUpdate.password_hash = bodyData.password_hash;
    toUpdate.addresses = bodyData.addresses;

    // Step 3: Save the entity
    return (await this.customerRepository.save(toUpdate)) as T;
  }

  // return type of Promise<Customer[] | undefined | EntityError>
  async updateMany(bodyData: Customer[]): Promise<T | EntityError | undefined> {
    for (let i = 0; i < bodyData.length; i++) {
      await this.updateOne(bodyData[i]);
    }
    const ids = bodyData.map((c) => c.id);
    return (await this.customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.addresses', 'addresses')
      .where('customer.id IN (:...ids)', { ids })
      .getMany()) as T;
    // return (await this.customerRepository.find({
    //   where: {
    //     id: In(ids)
    //   }
    // })) as T;
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    return await this.customerRepository.delete({ id });
  }

  async deleteMany(ids: Array<string>): Promise<DeleteResult> {
    return await this.customerRepository.delete({
      id: In(ids)
    });
  }
}

export default CustomerService;
