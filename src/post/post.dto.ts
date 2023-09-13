import { Post } from '@db/entity/post.entity';

export interface PostsDTO {
  list: Array<Post>;
  count: number;
}

export interface PostRO {
  post: Post;
}
