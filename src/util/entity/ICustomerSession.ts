import { ICustomer } from "./ICustomer";

export interface ICustomerSession {
  name: string;
  value: string;
  customers?: ICustomer[]
}
