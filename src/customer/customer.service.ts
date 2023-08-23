import { CustomerAddress } from '@db/entity/customer-address.entity';
import { Customer } from '@db/entity/customer.entity';
import { DeleteResult, Repository } from 'typeorm';
import CustomerRepository from './customer.repository';
import CustomerAddressRepository from '@/customer-address/customer-address.repository';
import { Service } from 'typedi';
import { validate } from 'class-validator';
import { NextApiRequest, NextApiResponse } from 'next';
import { MapErrorType } from '@/util/type';

@Service()
class CustomerService<T> {
  constructor() {}

  private customerRepository: Repository<Customer> = CustomerRepository;
  private customerAddressRepository: Repository<CustomerAddress> = CustomerAddressRepository;

  // return type of Promise<CustomersDTO>
  async all(): Promise<T> {
    const qbCustomer = await this.customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.addresses', 'addresses');

    const countCustomer = await qbCustomer.getCount();
    const listCustomer = await qbCustomer.getMany();

    const qbCustomerAddress = await this.customerAddressRepository
      .createQueryBuilder('customer_address')
      .leftJoinAndSelect('customer_address.customers', 'customers');

    const countCustomerAddress = await qbCustomerAddress.getCount();
    const listCustomerAddress = await qbCustomerAddress.getMany();

    return { countCustomer, listCustomer, countCustomerAddress, listCustomerAddress } as T;
  }

  // return type of Promise<CustomersDTO>
  async findOne(customerId: string): Promise<T> {
    return await this.customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.addresses', 'addresses')
      .where('customer.id = :customerId', { customerId }).getOne() as T;
  }

  // return type of Promise<Customer>
  async createOne(
    customerData: Customer,
    req: NextApiRequest,
    res: NextApiResponse<T | void | MapErrorType>
  ): Promise<T | void> {
    const customerAddressList: Array<CustomerAddress> = [];
    let customerAddress = new CustomerAddress();
    customerData.addresses?.map(async (item) => {
      const customerAddressErrors = await validate(customerAddress);
      if (customerAddressErrors.length > 0) {
        return res.status(400).json({ errors: customerAddressErrors.map((err) => err.constraints) });
      }
      customerAddressList.push(item);
    });

    let customer = new Customer();
    customer.first_name = customerData.first_name;
    customer.last_name = customerData.last_name;
    customer.phone_number = customerData.phone_number;
    customer.email = customerData.email;
    customer.password_hash = customerData.password_hash;
    customer.active = false;
    customer.addresses = customerAddressList;

    const customerErrors = await validate(customer);

    if (customerErrors.length > 0) {
      return res.status(400).json({ errors: customerErrors.map((err) => err.constraints) });
    }
    return (await this.customerRepository.save(customer)) as T;
  }

  async createMany(
    customersData: Customer[],
    req: NextApiRequest,
    res: NextApiResponse<T | void | MapErrorType>
  ): Promise<void> {
    customersData.map(async (c) => {
      await this.createOne(c, req, res);
    });
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

  async deleteOne(customerId: string): Promise<DeleteResult> {
    return await this.customerRepository.delete({ id: customerId });
  }

  async deleteMany(customersId: string[]) {
    customersId.map(async (ci) => {
      return await this.customerRepository.delete({ id: ci });
    });
  }
}

export default CustomerService;
