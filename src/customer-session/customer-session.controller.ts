import { Container, Service } from 'typedi';
import { DeleteResult } from 'typeorm';
import CustomerSessionService from '@/customer-session/customer-session.service';
import { EntityError } from '@/util/type';
import { CustomerSession } from '@db/entity/customer-session.entity';

@Service()
class CustomerSessionSessionController<T> {
  private customerSessionService = Container.get(CustomerSessionService<T>);

  constructor() {}

  async all(): Promise<T> {
    return await this.customerSessionService.all();
  }

  async findOne(id: string): Promise<T> {
    return await this.customerSessionService.findOne(id);
  }

  async createOne(bodyData: CustomerSession): Promise<T> {
    return await this.customerSessionService.createOne(bodyData);
  }

  async createMany(bodyData: CustomerSession[]): Promise<T> {
    return await this.customerSessionService.createMany(bodyData);
  }

  async updateOne(bodyData: CustomerSession): Promise<T | EntityError> {
    return await this.customerSessionService.updateOne(bodyData);
  }

  async updateMany(bodyData: CustomerSession[]): Promise<T | EntityError | undefined> {
    return await this.customerSessionService.updateMany(bodyData);
  }

  async deleteOne(id: string): Promise<void | T | DeleteResult> {
    return await this.customerSessionService.deleteOne(id);
  }

  async deleteMany(ids: string[]): Promise<void | T | DeleteResult> {
    return await this.customerSessionService.deleteMany(ids);
  }
}

export default CustomerSessionSessionController;
