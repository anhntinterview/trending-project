import { LabEntity, TableA } from '@db/entity/test.entity';
import { AppDataSource } from '@root/data-source';

beforeAll(async () => await AppDataSource.initialize());

afterAll(async () => {
  return await AppDataSource.destroy();
});

test('store Joe and fetch it', async () => {
  await AppDataSource.getRepository(LabEntity).insert({
    name: 'Another'
  });
  let joe = await AppDataSource.getRepository(LabEntity).find({
    where: {
      id: 1
    }
  });

  expect(joe[0].name).toBe('Another');
});

test('should fetch value from Table A exactly', async () => {
  const tableARepo = await AppDataSource.getRepository(TableA);
  let qbA = await tableARepo.createQueryBuilder('tableA').leftJoinAndSelect('tableA.tableBs', 'tableB');

  const countA = await qbA.getCount();
  const tbAById = await qbA.where({ id: '81c9b3d2-1d7c-48a4-b185-48d9081e11be' }).getOne();

  expect(countA).toBe(1);
  expect(tbAById?.name).toBe('tableAC');
});