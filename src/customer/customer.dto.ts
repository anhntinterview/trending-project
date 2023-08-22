import { Customer } from '@db/entity/customer.entity';

export interface E {
  list: Array<E>;
  count: number;
}

export interface CustomersDTO {
  list: Array<Customer>;
  count: number;
}

export interface CustomerRO {
  customer: Customer | null;
}
