import ApiOperation from '@/core/provider/api-operation.provider';
import CustomerController from './customer.controller';
import { Container } from 'typedi';
import { CustomersDTO } from './customer.dto';

class CustomerModule {
  private customerController = Container.get(CustomerController);

  getAll(): Promise<CustomersDTO> {
    return this.customerController.all();
  }
}

export default CustomerModule;
