import { CustomerAddress } from '@db/entity/customer-address.entity';
import { Customer } from '@db/entity/customer.entity';
import { DeleteResult, Repository } from 'typeorm';
import CustomerRepository from './customer.repository';
import CustomerAddressRepository from '@/customer-address/customer-address.repository';
import { Service } from 'typedi';

@Service()
class CustomerService<T> {
  constructor() {}

  private customerRepository: Repository<Customer> = CustomerRepository;
  private customerAddressRepository: Repository<CustomerAddress> = CustomerAddressRepository;

  // return type of Promise<CustomersDTO>
  async all(): Promise<T> {
    const qb = await this.customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.addresses', 'addresses');

    const count = await qb.getCount();
    const list = await qb.getMany();

    return { list, count } as T;
  }

  // return type of Promise<CustomersDTO>
  async findOne(customerId: number): Promise<T> {
    const customer = await this.customerRepository.findOne({
      where: { id: customerId }
    });
    return { customer } as T;
  }

  // return type of Promise<Customer>
  async createOne(customerData: Customer, customerAddressData: CustomerAddress): Promise<T> {
    let customerAddress = new CustomerAddress();
    customerAddress.address_line1 = customerAddressData.address_line1;
    customerAddress.address_line2 = customerAddressData.address_line2;
    customerAddress.city = customerAddressData.city;
    customerAddress.country = customerAddressData.country;
    customerAddress.phone_number = customerAddressData.phone_number;
    customerAddress.postal_code = customerAddressData.postal_code;

    let customer = new Customer();
    customer.first_name = customerData.first_name;
    customer.last_name = customerData.last_name;
    customer.phone_number = customerData.phone_number;
    customer.email = customerData.email;
    customer.addresses = [customerAddress];

    return (await this.customerRepository.save(customer)) as T;
  }

  async createMany(customersData: Customer[], customerAddressesData: CustomerAddress[]): Promise<void> {
    customersData.map(async (c) => {
      customerAddressesData.map(async (ca) => {
        await this.createOne(c, ca);
      });
    });
  }

  // return type of Promise<Customer | undefined>
  async updateOne(customerId: number, customerData: Customer): Promise<T | undefined> {
    let toUpdate = await this.customerRepository.findOne({
      where: { id: customerId },
      relations: ['addresses']
    });
    if (toUpdate) {
      let updated = Object.assign(toUpdate, customerData);
      return (await this.customerRepository.save(updated)) as T;
    }
  }

  async updateMany(customersId: number[], customersData: Customer[]): Promise<void> {
    customersId.map(async (ci) => {
      customersData.map(async (c) => {
        return await this.updateOne(ci, c);
      });
    });
  }

  async deleteOne(customerId: number): Promise<DeleteResult> {
    return await this.customerRepository.delete({ id: customerId });
  }

  async deleteMany(customersId: number[]) {
    customersId.map(async (ci) => {
      return await this.customerRepository.delete({ id: ci });
    });
  }
}

export default CustomerService;
