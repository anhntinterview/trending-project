import { ICustomerSession } from '@root/type/entity/ICustomerSession';

export interface CustomersSessionDTO {
  list: Array<ICustomerSession>;
  count: number;
}

export interface CustomersSessionRO {
  customerSession: ICustomerSession;
}
