import { NextApiRequest, NextApiResponse } from 'next';
import ApiProvider from '@/core/provider/singleton/api.provider';
import CRUDModule from '@/core/service/crud/crud.module';
import CRUDMiddleware from '@/core/service/crud/crud.middleware';
import TagRepository from '@/tag/tag.repository';
import PostRepository from '@/post/post.repository';
import { CustomeObjectLiteral } from '@root/type/entity/common';
import { Tag } from '@db/entity/tag.entity';
import { TagBodyDataValidation } from '@/tag//tag.type';

class TagModule<Tag extends CustomeObjectLiteral, Post extends CustomeObjectLiteral> extends ApiProvider {
  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
  }

  public crudModule = new CRUDModule<Tag, Post>(this.req, this.res, TagRepository, PostRepository, 'tag', 'posts');
  public crudMiddleware = new CRUDMiddleware<Tag, Post>(
    this.req,
    this.res,
    TagRepository,
    PostRepository,
    'tag',
    'posts'
  );

  async createOne() {
    return await this.crudMiddleware.createOne(new TagBodyDataValidation(), new Tag());
  }
}

export default TagModule;
