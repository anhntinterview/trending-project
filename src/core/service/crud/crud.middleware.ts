import { NextApiRequest, NextApiResponse } from 'next';
import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { Service } from 'typedi';
import { validate } from 'class-validator';
import ApiProvider from '@/core/provider/singleton/api.provider';
import CRUDService from '@/core/service/crud/crud.service';
import slugify from 'slugify';

import { APIMethodType } from '@root/type/entity/common';

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

  async validate(
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
        await this.validate(validateBodyData, bodyData, async () => {
          for (const key in bodyData) {
            if (bodyData['tags'].length > 0) {
              console.log(`--- bodyData['tags']:`, bodyData['tags']);
              bodyData['tags'].forEach((item) => {
                if (item.name === 'post') {
                  newEntity.slug = slugify(bodyData['title'], { lower: true });
                  newEntity.excerpt = `${bodyData['content'].slice(100)}...`
                  newEntity.created_by = bodyData['customerId']
                  newEntity.updated_by = bodyData['customerId']
                }
              });
            }
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
