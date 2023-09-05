import { CustomerAddress } from "@db/entity/customer-address.entity";
import { ICustomerAddress } from "./ICustomerAddress";
import { ICustomerSession } from "./ICustomerSession";

export interface ICustomer {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  active: boolean;
  sessions?: Partial<ICustomerSession>[],
  hash?: string,
  salt?: string,
  addresses?: CustomerAddress[]
}
