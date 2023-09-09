import Container, { Service } from 'typedi';
import { DeleteResult, In, Repository } from 'typeorm';
import { EntityError } from '@/util/type';
import { GetOneByAttribute } from '@root/type/entity/common';
import CustomerAddressRepository from './customer-address.repository';
import { CustomerAddress } from '@db/entity/customer-address.entity';
import CustomerService from '@/customer/customer.service';

@Service()
class CustomerAddressService<T> {
  constructor() {}

  private customerAddressRepository: Repository<CustomerAddress> = CustomerAddressRepository;

  async deleteOne(id: string): Promise<DeleteResult> {
    return await this.customerAddressRepository.delete({ id });
  }

  async deleteMany(ids: Array<string>): Promise<DeleteResult> {
    return await this.customerAddressRepository.delete({
      id: In(ids)
    });
  }
}

export default CustomerAddressService;
