import ApiOperation from '@/core/api-operation';
import CustomerController from './customer.controller';
import { MethodType } from '@/core/method';
import { Container } from 'typedi';
import { CustomersDTO } from './customer.dto';

class CustomerModule {
  private customerController = Container.get(CustomerController);

  getAll(): Promise<CustomersDTO> {
    return this.customerController.all();
  }
}

export default CustomerModule;
