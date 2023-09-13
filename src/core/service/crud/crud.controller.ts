import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import CRUDService from './crud.service';
import { GetOneByAttribute } from '@root/type/entity/common';

class CRUDController<T extends EntityTarget<ObjectLiteral>, F extends EntityTarget<ObjectLiteral>> {
  private constraintTable: string;
  private entityTable: string;
  private repository: Repository<ObjectLiteral>;
  private constraintRepository: Repository<ObjectLiteral>;
  private entityService: CRUDService<T, F>;

  constructor(
    repository: Repository<ObjectLiteral>,
    constraintRepository: Repository<ObjectLiteral>,
    entityTable: string,
    constraintTable: string
  ) {
    this.repository = repository;
    this.constraintRepository = constraintRepository;
    this.entityTable = entityTable;
    this.constraintTable = constraintTable;
    this.entityService = new CRUDService<T, F>(
      this.repository,
      this.constraintRepository,
      this.entityTable,
      this.constraintTable
    );
  }

  async findOneByAttribute(bodyData: GetOneByAttribute) {
    return (await this.entityService.findOneByAttribute(bodyData)) as T;
  }

  async all() {
    return await this.entityService.all();
  }

  async findOne(id: string) {
    await this.entityService.findOne(id);
  }

  async createOne(bodyData: ObjectLiteral) {
    return await this.entityService.createOne(bodyData);
  }

  async createMany(bodyData: ObjectLiteral[]) {
    return await this.entityService.createMany(bodyData);
  }

  async updateOne(bodyData: T) {
    return await this.entityService.updateOne(bodyData);
  }

  async updateMany(bodyData: T[]) {
    return await this.entityService.updateMany(bodyData);
  }

  async deleteOne(id: string) {
    return await this.entityService.deleteOne(id);
  }

  async deleteMany(ids: string[]) {
    return await this.entityService.deleteMany(ids);
  }
}

export default CRUDController;
