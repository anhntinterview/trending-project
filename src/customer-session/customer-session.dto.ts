import { ICustomerSession } from '@/util/entity/ICustomerSession';

export interface CustomersSessionDTO {
  list: Array<ICustomerSession>;
  count: number;
}

export interface CustomersSessionRO {
  customerSession: ICustomerSession;
}
