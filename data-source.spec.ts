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
  const tbAById = await qbA.where({ id: '0668a953-629f-4d07-9176-e7aa1dcc9f2e' }).getOne();

  expect(countA).toBe(3);
  expect(tbAById?.name).toBe('tableA2');
});