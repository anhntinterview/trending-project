import { Customer } from "@db/entity/customer.entity";
import { AppDataSource } from "@root/data-source";

export class TestController {
  private readonly testRepository = AppDataSource.getRepository(Customer);

  async all() {
    return this.testRepository.find();
  }
}
