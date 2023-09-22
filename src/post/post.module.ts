import { NextApiRequest, NextApiResponse } from 'next';
import CRUDModule from '@/core/service/crud/crud.module';
import ApiProvider from '@/core/provider/singleton/api.provider';
import PostRepository from '@/post/post.repository';
import TagRepository from '@/tag/tag.repository';
import { CustomeObjectLiteral } from '@root/type/entity/common';
import CRUDMiddleware from '@/core/service/crud/crud.middleware';
import { PostBodyDataValidation } from '@/post/post.type';
import { Post } from '@db/entity/post.entity';

class PostModule<Post extends CustomeObjectLiteral, Tag extends CustomeObjectLiteral> extends ApiProvider {
  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
  }

  public crudModule = new CRUDModule<Post, Tag>(this.req, this.res, PostRepository, TagRepository, 'post', 'tags');
  public crudMiddleware = new CRUDMiddleware<Post, Tag>(this.req, this.res, PostRepository, TagRepository, 'post', 'tags');
  
  async createOneWithMiddlware() {
    return await this.crudMiddleware.createOne(new PostBodyDataValidation(), new Post());
  }
}

export default PostModule;
