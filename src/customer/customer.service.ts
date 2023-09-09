import { Customer } from '@db/entity/customer.entity';
import Container, { Service } from 'typedi';
import { DeleteResult, In, Repository } from 'typeorm';
import CustomerRepository from './customer.repository';
import { EntityError } from '@/util/type';
import { GetOneByAttribute } from '@root/type/entity/common';
import CustomerAddressService from '@/customer-address/customer-address.service';

@Service()
class CustomerService<T> {
  constructor() {}

  private customerRepository: Repository<Customer> = CustomerRepository;
  private customerAddressService = Container.get(CustomerAddressService<T>);

  // return type of Promise<Customer>
  async findOneByAttribute(bodyData: GetOneByAttribute) {
    const { nameAttr, valueAttr } = bodyData;
    const customer = await this.customerRepository.findOne({ where: { [nameAttr]: valueAttr } });
    return customer;
    
    // const customer = await this.customerRepository
    //   .createQueryBuilder('customer')
    //   .leftJoinAndSelect('customer.addresses', 'addresses')
    //   .leftJoinAndSelect('customer.sessions', 'sessions')
    //   .where(`customer.${nameAttr} = :${nameAttr}`, { [nameAttr]: valueAttr })
    //   .getOne();
    
  }

  // return type of Promise<CustomersDTO>
  async all(): Promise<T> {
    const qbCustomer = await this.customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.addresses', 'addresses')
      .leftJoinAndSelect('customer.sessions', 'sessions');

    const countCustomer = await qbCustomer.getCount();
    const listCustomer = await qbCustomer.getMany();

    return { countCustomer, listCustomer } as T;
  }

  // return type of Promise<Customer>
  async findOne(id: string) {
    const customer = await this.customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.addresses', 'addresses')
      .leftJoinAndSelect('customer.sessions', 'sessions')
      .where('customer.id = :id', { id })
      .getOne();
    return customer;
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
    toUpdate.username = bodyData.username;
    toUpdate.first_name = bodyData.first_name;
    toUpdate.last_name = bodyData.last_name;
    toUpdate.phone_number = bodyData.phone_number;
    toUpdate.active = bodyData.active;
    toUpdate.email = bodyData.email;
    toUpdate.hash = bodyData.hash;
    toUpdate.salt = bodyData.salt;
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

  async deleteOne(id: string) {
    const customer = await this.findOne(id);
    if (customer) {
      const customerAddresses = customer.addresses;
      if (customerAddresses) {
        const cdIds = customerAddresses?.map((item) => item.id);
        this.customerAddressService.deleteMany(cdIds);
      }
      return await this.customerRepository.delete({ id });
    }
  }

  async deleteMany(ids: Array<string>): Promise<DeleteResult> {
    return await this.customerRepository.delete({
      id: In(ids)
    });
  }
}

export default CustomerService;
