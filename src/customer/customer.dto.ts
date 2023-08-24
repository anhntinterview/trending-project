import { Customer } from '@db/entity/customer.entity';

export interface CustomersDTO {
  list: Array<Customer>;
  count: number;
}

export interface CustomerRO {
  customer: Customer;
}
