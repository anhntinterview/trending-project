import Container, { Service } from 'typedi';
import { DeleteResult, In, Repository } from 'typeorm';
import CustomerSessionRepository from './customer-session.repository';
import { EntityError } from '@/util/type';
import { CustomerSession } from '@db/entity/customer-session.entity';
import CookieService from '@/core/cookie/cookies.service';
import { ICustomerSession } from '@/util/entity/ICustomerSession';
import { CreateOneByCustomerIdBodyDataType } from './customer-session.type';

@Service()
class CustomerSessionService<T> {
  constructor() {}

  private customerSessionRepository: Repository<CustomerSession> = CustomerSessionRepository;

  private cookieService = Container.get(CookieService);

  async createOneByCustomerId(bodyData: CreateOneByCustomerIdBodyDataType): Promise<T> {
    const { sessionName, customer, timer } = bodyData;
    const customerId = customer.id;
    const currentTime = new Date();
    const expiredDate = new Date(currentTime.getTime() + timer * 1000);
    this.cookieService.sessionName = this.cookieService.generateRandomToken();
    const customerSession: ICustomerSession = {
      name: `session:${sessionName}`,
      value: JSON.stringify({ customerId, currentTime, expiredDate }),
      customers: [customer]
    };

    await this.createOne(customerSession);

    const reFetchCustomerSession = await this.customerSessionRepository
      .createQueryBuilder('customer_session')
      .leftJoinAndSelect('customer_session.customers', 'customers')
      .where('customer_session.name = :name', { name: `session:${sessionName}` })
      .getOne();

    return reFetchCustomerSession as T;
  }

  // return type of Promise<CustomersDTO>
  async all(): Promise<T> {
    const qbCustomer = await this.customerSessionRepository
      .createQueryBuilder('customer_session')
      .leftJoinAndSelect('customer_session.customers', 'customers');

    const countCustomer = await qbCustomer.getCount();
    const listCustomer = await qbCustomer.getMany();

    return { countCustomer, listCustomer } as T;
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
    toUpdate.name = bodyData.name;
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
