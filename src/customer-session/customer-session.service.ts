import Container, { Service } from 'typedi';
import { DeleteResult, In, Repository } from 'typeorm';
import CustomerSessionRepository from './customer-session.repository';
import { EntityError } from '@/util/type';
import { CustomerSession } from '@db/entity/customer-session.entity';
import CookieService from '@/core/cookie/cookies.service';
import { ICustomerSession } from '@root/type/entity/ICustomerSession';
import { CreateOneByCustomerIdBodyDataType } from './customer-session.type';
import { GetOneByAttribute } from '@root/type/entity/common';
import CustomerRepository from '@/customer/customer.repository';
import { Customer } from '@db/entity/customer.entity';
import CustomerService from '@/customer/customer.service';

@Service()
class CustomerSessionService<T> {
  constructor() {}

  private customerSessionRepository: Repository<CustomerSession> = CustomerSessionRepository;
  private customerService = Container.get(CustomerService<T>);
  private cookieService = Container.get(CookieService);

  // return type of Promise<CustomerSession>
  async findOneByAttributeFromRelatedTable(bodyData: GetOneByAttribute) {
    const { valueAttr } = bodyData;
    const customer = await this.customerService.findOne(valueAttr);
    console.log(`customer ---`, customer);
    const customerSession = customer?.sessions;
    console.log(`customerSession ---`, customerSession);
    return customerSession;
  }

  // return type of Promise<CustomerSession>
  async findOneByAttribute(bodyData: GetOneByAttribute) {
    const { nameAttr, valueAttr } = bodyData;
    const customerSession = await this.customerSessionRepository
      .createQueryBuilder('customer_session')
      .leftJoinAndSelect('customer_session.customers', 'customers')
      .where(`customer_session.${nameAttr} = :${nameAttr}`, { [nameAttr]: valueAttr })
      .getOne();
    return customerSession;
  }

  async createOneByCustomerId(bodyData: CreateOneByCustomerIdBodyDataType): Promise<T> {
    const { customer, timer, path } = bodyData;
    const customerId = customer.id;
    const currentTime = new Date();
    const expiredDate = new Date(currentTime.getTime() + timer * 1000);
    this.cookieService.sessionName = this.cookieService.generateRandomToken();
    const customerSession: ICustomerSession = {
      value: JSON.stringify({ customerId, currentTime, expiredDate, path }),
      customers: [customer]
    };

    await this.createOne(customerSession);

    const reFetchCustomer = await this.customerService.findOne(customerId);

    return reFetchCustomer as T;
  }

  // return type of Promise<CustomersDTO>
  async all() {
    const qbCustomer = await this.customerSessionRepository
      .createQueryBuilder('customer_session')
      .leftJoinAndSelect('customer_session.customers', 'customers');

    const customerSessionCount = await qbCustomer.getCount();
    const customerSessionList = await qbCustomer.getMany();

    return { customerSessionCount, customerSessionList };
  }

  // return type of Promise<Customer>
  async findOne(id: string): Promise<T> {
    return (await this.customerSessionRepository
      .createQueryBuilder('customer_session')
      .leftJoinAndSelect('customer_session.customers', 'customers')
      .where('customer_session.id = :id', { id })
      .getOne()) as T;
  }

  // return type of Promise<Customer>
  async createOne(bodyData: ICustomerSession): Promise<T> {
    const customerSession = await this.customerSessionRepository.save(bodyData);
    return customerSession as T;
  }

  // return type of Promise<Customer[]>
  async createMany(bodyData: CustomerSession[]): Promise<T> {
    return (await this.customerSessionRepository.save(bodyData)) as T;
  }

  // return type of Promise<Customer | undefined>
  async updateOne(bodyData: CustomerSession): Promise<T | EntityError> {
    // Step 1: Fetch the entity
    const toUpdate = await this.customerSessionRepository.findOne({
      where: { id: bodyData.id }
    });

    if (!toUpdate) {
      return { errors: 'Query was failed!' }; // Entity not found
    }

    // Step 2: Modify the entity
    toUpdate.value = bodyData.value;

    // Step 3: Save the entity
    return (await this.customerSessionRepository.save(toUpdate)) as T;
  }

  // return type of Promise<Customer[] | undefined | EntityError>
  async updateMany(bodyData: CustomerSession[]): Promise<T | EntityError | undefined> {
    for (let i = 0; i < bodyData.length; i++) {
      await this.updateOne(bodyData[i]);
    }
    const ids = bodyData.map((c) => c.id);
    return (await this.customerSessionRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer_session.customers', 'customers')
      .where('customer_session.id IN (:...ids)', { ids })
      .getMany()) as T;
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    return await this.customerSessionRepository.delete({ id });
  }

  async deleteMany(ids: Array<string>): Promise<DeleteResult> {
    return await this.customerSessionRepository.delete({
      id: In(ids)
    });
  }
}

export default CustomerSessionService;
