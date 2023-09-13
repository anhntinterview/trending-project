import { ICustomer } from './ICustomer';

export interface IPost {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  excerpt: string;
  ogImage: string; // Open Graph image size: https://kaydee.net/blog/open-graph-image/
  content: string;
}
