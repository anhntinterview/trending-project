import { GetOneByAttribute } from '@root/type/entity/common';
import { Repository, EntityTarget, ObjectLiteral, In } from 'typeorm';

class CRUDService<T extends EntityTarget<ObjectLiteral>, F extends EntityTarget<ObjectLiteral>> {
  private constraintTable: string;
  private entityTable: string;
  private repository: Repository<ObjectLiteral>;
  private constraintRepository: Repository<ObjectLiteral>;

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
  }

  async findOneByAttribute(bodyData: GetOneByAttribute) {
    const { nameAttr, valueAttr } = bodyData;
    return await this.repository
      .createQueryBuilder(this.entityTable)
      .leftJoinAndSelect(`${this.entityTable}.${this.constraintTable}`, `${this.constraintTable}`)
      .where(`${this.entityTable}.${nameAttr} = :${nameAttr}`, { [nameAttr]: valueAttr })
      .getOne();
  }

  async all() {
    const queryEntity = await this.repository
      .createQueryBuilder(this.entityTable)
      .leftJoinAndSelect(`${this.entityTable}.${this.constraintTable}`, `${this.constraintTable}`);

    const count = await queryEntity.getCount();
    const list = await queryEntity.getMany();

    return { count, list };
  }

  async findOne(id: string) {
    const queryEntity = await this.repository
      .createQueryBuilder(this.entityTable)
      .leftJoinAndSelect(`${this.entityTable}.${this.constraintTable}`, `${this.constraintTable}`)
      .where(`${this.entityTable}.id = :id`, { id })
      .getOne()
    return queryEntity;
  }

  async createOne(bodyData: ObjectLiteral) {
    return await this.repository.save(bodyData);
  }

  async createMany(bodyData: ObjectLiteral[]) {
    return await this.repository.save(bodyData);
  }

  async updateOne(bodyData) {
    // Step 1: Fetch the entity
    const toUpdate = await this.repository.findOne({
      where: { id: bodyData.id }
    });

    if (!toUpdate) {
      return { errors: 'Query was failed!' }; // Entity not found
    }

    // Step 2: Modify the entity
    for (const key in bodyData) {
      if (bodyData.hasOwnProperty(key)) {
        toUpdate[key] = bodyData[key];
      }
    }

    // Step 3: Save the entity
    return await this.repository.save(toUpdate);
  }

  async updateMany(bodyData: Array<any>) {
    for (let i = 0; i < bodyData.length; i++) {
      await this.updateOne(bodyData[i]);
    }
    const ids = bodyData.map((c) => c.id);
    return await this.repository
      .createQueryBuilder(this.entityTable)
      .leftJoinAndSelect(`${this.entityTable}.${this.constraintTable}`, `${this.constraintTable}`)
      .where(`${this.entityTable}.id IN (:...ids)`, { ids })
      .getMany();
  }

  async deleteOne(id: string) {
    const queryEntity = await this.findOne(id);
    if (queryEntity) {
      const constraintField = queryEntity[this.constraintTable];
      if (constraintField) {
        const cfIds = constraintField?.map((item) => item.id);
        this.constraintRepository.delete({
          id: In(cfIds)
        });
      }
      return await this.repository.delete({ id });
    }
  }

  async deleteMany(ids: Array<string>) {
    return await this.repository.delete({
      id: In(ids)
    });
  }
}

export default CRUDService;
