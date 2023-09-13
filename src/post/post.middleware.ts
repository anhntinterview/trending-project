import { NextApiRequest, NextApiResponse } from 'next';
import { Service } from 'typedi';
import slugify from 'slugify';
import { validate } from 'class-validator';
import { PostBodyDataValidation } from './post.type';
import { Post } from '@db/entity/post.entity';
import ApiProvider from '@/core/provider/singleton/api.provider';
import PostRepository from './post.repository';
import TagRepository from '@/tag/tag.repository';
import CRUDService from '@/core/service/crud/crud.service';
import { APIMethodType } from '@root/type/entity/common';

@Service()
class PostMiddleware extends ApiProvider{
  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
  }
  private crudService = new CRUDService(PostRepository, TagRepository, 'post', 'tags');

  async isExistedPost(title: string) {
    const slug = slugify(title, { lower: true });
    const isExistedPost = await this.crudService.findOneByAttribute({ nameAttr: 'slug', valueAttr: slug });
    return isExistedPost ? true : false;
  }

  async postValidate(checkExist: boolean, bodyData: PostBodyDataValidation, callback: () => Promise<unknown>) {
    const validateBodyData = new PostBodyDataValidation();
    const { title } = bodyData;
    // const { title, coverImage, excerpt, ogImage, content, customerId, tags } = bodyData;

    if (checkExist) {
      const isExist = await this.isExistedPost(title);
      if (isExist) {
        this.errorResponse = { error: 'Post title was existed' };
        return this.sendErrorResponse();
      }
    }
    for (const key in bodyData) {
      if (bodyData.hasOwnProperty(key)) {
        validateBodyData[key] = bodyData[key];
      } else {
        this.errorResponse = { error: `${key} key is not exist in bodyData` };
        return this.sendErrorResponse();
      }
    }
    // validateBodyData.title = title;
    // validateBodyData.coverImage = coverImage;
    // validateBodyData.excerpt = excerpt;
    // validateBodyData.ogImage = ogImage;
    // validateBodyData.content = content;
    // validateBodyData.customerId = customerId;
    // validateBodyData.tags = tags;

    const errors = await validate(validateBodyData);
    if (errors.length > 0) {
      errors.map((err) => {
        this.errorResponse = err.constraints;
        return this.sendErrorResponse();
      });
    } else {
      return callback();
    }
  }

  async createOne() {
    return await this.handleBodyDataResponse(
      APIMethodType.POST, // method
      async (bodyData: PostBodyDataValidation) => {
        await this.postValidate(
          true, // checkExist
          bodyData,
          async () => {
            const newPost = new Post();
            newPost.slug = slugify(bodyData.title, { lower: true });
            for (const key in bodyData) {
              if (bodyData.hasOwnProperty(key) && key !== "slug") {
                newPost[key] = bodyData[key];
              } else {
                this.errorResponse = { error: `${key} key is not exist in bodyData` };
                return this.sendErrorResponse();
              }
            }
            // newPost.title = bodyData.title;
            // newPost.coverImage = bodyData.coverImage;
            // newPost.excerpt = bodyData.excerpt;
            // newPost.ogImage = bodyData.ogImage;
            // newPost.content = bodyData.content;
            // newPost.updated_by = '';
            // newPost.tags = bodyData.tags;
            // newPost.created_by = bodyData.customerId;
            return await this.crudService.createOne(newPost);
          }
        );
      }
    );
  }
}

export default PostMiddleware;
