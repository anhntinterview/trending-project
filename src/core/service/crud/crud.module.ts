import { NextApiRequest, NextApiResponse } from 'next';
import ApiProvider from '../../provider/singleton/api.provider';
import { APIMethodType, APIParameterType, GetOneByAttribute } from '@root/type/entity/common';
import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import CRUDController from './crud.controller';

class CRUDModule<T extends EntityTarget<ObjectLiteral>, F extends EntityTarget<ObjectLiteral>> extends ApiProvider {
  private constraintTable: string;
  private entityTable: string;
  private repository: Repository<ObjectLiteral>;
  private constraintRepository: Repository<ObjectLiteral>;
  private entityController: CRUDController<T, F>;

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
    this.entityController = new CRUDController<T, F>(
      this.repository,
      this.constraintRepository,
      this.entityTable,
      this.constraintTable
    );
  }

  async getOneByAttribute() {
    return await this.handleHttpRequestResponse(
      APIMethodType.POST, // method
      (undefined, bodyData: GetOneByAttribute) => this.entityController.findOneByAttribute(bodyData), // callback
      APIParameterType.BODY_DATA
    );
  }

  async getAll() {
    return await this.handleHttpRequestResponse(
      APIMethodType.GET, // method
      () => this.entityController.all() // callback
    );
  }

  async getOne() {
    return await this.handleHttpRequestResponse(
      APIMethodType.GET, // method
      (id: string) => this.entityController.findOne(id), // callback
      APIParameterType.URL_PARAM
    );
  }

  async createOne() {
    return await this.handleHttpRequestResponse(
      APIMethodType.POST, // method
      (undefined, bodyData: ObjectLiteral) => this.entityController.createOne(bodyData), // callback
      APIParameterType.BODY_DATA
    );
  }

  async createMany() {
    return await this.handleHttpRequestResponse(
      APIMethodType.POST,
      (undefined, bodyData: ObjectLiteral[]) => this.entityController.createMany(bodyData), // callback
      APIParameterType.BODY_DATA
    );
  }

  async updateOne() {
    return await this.handleHttpRequestResponse(
      APIMethodType.PUT, // method
      (undefined, bodyData: T) => this.entityController.updateOne(bodyData), // callback
      APIParameterType.BODY_DATA
    );
  }

  async updateMany() {
    return await this.handleHttpRequestResponse(
      APIMethodType.PUT, // method
      (undefined, bodyData: T[]) => this.entityController.updateMany(bodyData), // callback
      APIParameterType.BODY_DATA
    );
  }

  async deleteOne() {
    return await this.handleHttpRequestResponse(
      APIMethodType.DELETE, // method
      (id: string) => this.entityController.deleteOne(id), // callback
      APIParameterType.URL_PARAM
    );
  }

  async deleteMany() {
    return await this.handleHttpRequestResponse(
      APIMethodType.POST, // method
      (undefined, bodyData: string[]) => this.entityController.deleteMany(bodyData), // callback
      APIParameterType.BODY_DATA
    );
  }
}

export default CRUDModule;
