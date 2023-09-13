import { ICustomer } from './ICustomer';

export interface IRole {
  id: string;
  name: string;
  customers?: ICustomer[];
}
