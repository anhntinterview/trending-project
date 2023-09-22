import { IPost } from './IPost';

export interface ITag {
  id: string;
  name: string;
  posts?: IPost[];
}
