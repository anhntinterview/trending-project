import { Container, Service } from 'typedi';
import PostService from '@/post/post.service';

@Service()
class PostController {
  private postService = Container.get(PostService);
  constructor() {}
}

export default PostController;
