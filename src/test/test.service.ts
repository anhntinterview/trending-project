import { TableB, TableA } from '@db/entity/test.entity';
import { Repository } from 'typeorm';
import { TestsDTO, TestRO } from './test.dto';
import { TableARepo, TableBRepo } from './test.repository';
import { Service } from 'typedi';

@Service()
class TestrService {
  constructor() {}

  private tableARepo: Repository<TableA> = TableARepo;
  private tableBRepo: Repository<TableB> = TableBRepo;

  // async all(): Promise<Array<TableA>> {
  //   const qb = await this.tableARepo
  //     .find({relations: ["tableBs"]})

  //   return qb
  // }

  async all(): Promise<TestsDTO> {
    const qbA = await this.tableARepo
      .createQueryBuilder('tableA')
      .leftJoinAndSelect('tableA.tableBs', 'tableB')

    const countA = await qbA.getCount();
    const listA = await qbA.getMany();

    const qbB = await this.tableBRepo
      .createQueryBuilder('tableB')
      .leftJoinAndSelect('tableB.tableAs', 'tableA')

    const countB = await qbB.getCount();
    const listB = await qbB.getMany();

    return { listA, countA, listB, countB };
  }
}
export default TestrService;
