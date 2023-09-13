import { Container, Service } from 'typedi';
import CustomerService from '@/customer/customer.service';

@Service()
class CustomerController {
  private customerService = Container.get(CustomerService);
  constructor() {}
}

export default CustomerController;

// @Service()
// class CustomerController<T> {
//   private customerService = Container.get(CustomerService<T>);

//   constructor() {}

//   async findOneByAttribute(bodyData: GetOneByAttribute) {
//     return (await this.customerService.findOneByAttribute(bodyData)) as T;
//   }

//   async all(): Promise<T> {
//     return await this.customerService.all();
//   }

//   async findOne(id: string) {
//     await this.customerService.findOne(id);
//   }

//   async createOne(bodyData: Customer): Promise<T> {
//     return await this.customerService.createOne(bodyData);
//   }

//   async createMany(bodyData: Customer[]): Promise<T> {
//     return await this.customerService.createMany(bodyData);
//   }

//   async updateOne(bodyData: Customer) {
//     return await this.customerService.updateOne(bodyData);
//   }

//   async updateMany(bodyData: Customer[]): Promise<T | undefined> {
//     return await this.customerService.updateMany(bodyData);
//   }

//   async deleteOne(id: string) {
//     return await this.customerService.deleteOne(id);
//   }

//   async deleteMany(ids: string[]) {
//     return await this.customerService.deleteMany(ids);
//   }
// }

// export default CustomerController;
