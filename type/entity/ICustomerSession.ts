import { ICustomer } from "./ICustomer";

export interface ICustomerSession {
  value: string;
  customers?: ICustomer[];
}
