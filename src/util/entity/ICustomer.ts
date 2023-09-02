import { ICustomerAddress } from "./ICustomerAddress";
import { ICustomerSession } from "./ICustomerSession";

export interface ICustomer {
  id?: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password_hash: string;
  active: boolean;
  sessions?: Partial<ICustomerSession>[]
}
