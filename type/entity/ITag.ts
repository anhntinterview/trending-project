import { ICustomer } from './ICustomer';
import { IPost } from './IPost';

export interface ITag {
  id: string;
  name: string;
  posts?: IPost[];
  customers?: ICustomer[];
}
