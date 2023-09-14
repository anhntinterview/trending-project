import { NextApiRequest, NextApiResponse } from 'next';
import { Service } from 'typedi';
import { validate } from 'class-validator';
import { TagBodyDataValidation } from './tag.type';
import { Tag } from '@db/entity/tag.entity';
import ApiProvider from '@/core/provider/singleton/api.provider';
import TagRepository from '@/tag/tag.repository';
import PostRepository from '@/post/post.repository';
import CRUDService from '@/core/service/crud/crud.service';
import { APIMethodType } from '@root/type/entity/common';

@Service()
class TagMiddleware extends ApiProvider {
  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
  }
  private crudService = new CRUDService(TagRepository, PostRepository, 'tag', 'posts');

  async isExistedTag(name: string) {
    const isExistedTag = await this.crudService.findOneByAttribute({ nameAttr: 'name', valueAttr: name });
    return isExistedTag ? true : false;
  }

  async tagValidate(checkExist: boolean, bodyData: TagBodyDataValidation, callback: () => Promise<unknown>) {
    const validateBodyData = new TagBodyDataValidation();
    const { name } = bodyData;

    if (checkExist) {
      const isExist = await this.isExistedTag(name);
      if (isExist) {
        this.errorResponse = { error: 'Tag title was existed' };
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
      async (bodyData: TagBodyDataValidation) => {
        await this.tagValidate(
          true, // checkExist
          bodyData,
          async () => {
            const newTag = new Tag();
            for (const key in bodyData) {
              if (bodyData.hasOwnProperty(key)) {
                newTag[key] = bodyData[key];
              } else {
                this.errorResponse = { error: `${key} key is not exist in bodyData` };
                return this.sendErrorResponse();
              }
            }
            return await this.crudService.createOne(newTag);
          }
        );
      }
    );
  }
}

export default TagMiddleware;
