import { CustomerAddress } from '@db/entity/customer-address.entity';
import { Customer } from '@db/entity/customer.entity';
import { Repository } from 'typeorm';
import { CustomersDTO, CustomerRO } from './customer.dto';
import CustomerRepository from "./customer.repository";
import CustomerAddressRepository from "@/customer-address/customer-address.repository";

class CustomerService {
  constructor() {}

  private customerRepository: Repository<Customer> = CustomerRepository
  private customerAddressRepository: Repository<CustomerAddress> = CustomerAddressRepository
  

  async all(): Promise<CustomersDTO> {
    const qb = await this.customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.addresses', 'addresses');

    const count = await qb.getCount();
    const list = await qb.getMany();

    return { list, count };
  }

  async findOne(where): Promise<CustomerRO> {
    const customer = await this.customerRepository.findOne(where);
    return { customer };
  }
}
export default CustomerService;
