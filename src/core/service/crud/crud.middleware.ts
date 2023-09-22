import { NextApiRequest, NextApiResponse } from 'next';
import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { Service } from 'typedi';
import { validate } from 'class-validator';
import ApiProvider from '@/core/provider/singleton/api.provider';
import CRUDService from '@/core/service/crud/crud.service';

import { APIMethodType } from '@root/type/entity/common';
import slugify from 'slugify';

@Service()
class CRUDMiddleware<T extends EntityTarget<ObjectLiteral>, F extends EntityTarget<ObjectLiteral>> extends ApiProvider {
  private constraintTable: string;
  private entityTable: string;
  private repository: Repository<ObjectLiteral>;
  private constraintRepository: Repository<ObjectLiteral>;
  private crudService: CRUDService<T, F>;

  constructor(
    req: NextApiRequest,
    res: NextApiResponse,
    repository: Repository<ObjectLiteral>,
    constraintRepository: Repository<ObjectLiteral>,
    entityTable: string,
    constraintTable: string
  ) {
    super(req, res);
    this.repository = repository;
    this.constraintRepository = constraintRepository;
    this.entityTable = entityTable;
    this.constraintTable = constraintTable;
    this.crudService = new CRUDService<T, F>(
      this.repository,
      this.constraintRepository,
      this.entityTable,
      this.constraintTable
    );
  }

  async isExisted(nameAttr: string, valueAttr: string) {
    const isExistedPost = await this.crudService.findOneByAttribute({ nameAttr, valueAttr });
    return isExistedPost ? true : false;
  }

  async implementValidate(
    validateBodyData: object, // const validateBodyData = new ValidateObjectEntity()
    bodyData: object,
    callback: () => Promise<unknown>
  ) {
    for (const key in bodyData) {
      if (bodyData.hasOwnProperty(key)) {
        validateBodyData[key] = bodyData[key];
      } else {
        this.errorResponse = { error: `${key} key is not exist in bodyData` };
        return this.sendErrorResponse();
      }
    }
    const errors = await validate(validateBodyData);
    errors.map((err) => {
      console.log(`err: `, err);
    });
    if (errors.length > 0) {
      errors.map((err) => {
        this.errorResponse = err.constraints;
        return this.sendErrorResponse();
      });
    } else {
      return callback();
    }
  }

  async createOne(validateBodyData: object, newEntity: ObjectLiteral) {
    return await this.handleBodyDataResponse(
      APIMethodType.POST, // method
      async (bodyData: object) => {
        await this.implementValidate(validateBodyData, bodyData, async () => {
          const isPost = bodyData['tags'].find((item) => item.name === 'post');
          if (isPost) {
            newEntity['slug'] = slugify(bodyData['title']);
            newEntity['created_by'] = bodyData['customerId'];
            newEntity['updated_by'] = '';
          }
          for (const key in bodyData) {
            if (bodyData.hasOwnProperty(key)) {
              newEntity[key] = bodyData[key];
            } else {
              this.errorResponse = { error: `${key} key is not exist in bodyData` };
              return this.sendErrorResponse();
            }
          }
          return await this.crudService.createOne(newEntity);
        });
      }
    );
  }
}

export default CRUDMiddleware;
