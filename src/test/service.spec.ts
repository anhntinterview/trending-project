import { TestsDTO } from '@/test/test.dto';
import TestService from '@/test/test.service';

import { TableA } from '@db/entity/test.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { AppDataSource } from '@root/data-source';

beforeAll(async () => await AppDataSource.initialize());

afterAll(async () => {
  return await AppDataSource.destroy();
});

describe('TestService', () => {
  let testService = new TestService<TestsDTO>();
  let tableARepo: Repository<TableA>;

  it('should be defined', () => {
    expect(testService).toBeDefined();
  });

  it('should call tableARepo.createQueryBuilder once', async () => {
    const mockQueryBuilder = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      getCount: jest.fn().mockResolvedValue(10),
      getMany: jest.fn().mockResolvedValue([])
    };

    tableARepo = {
      createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder)
    } as unknown as Repository<TableA>;

    (testService as any).tableARepo = tableARepo; // Gán repository mock cho testService

    await testService.all();

    expect(tableARepo.createQueryBuilder).toHaveBeenCalledTimes(1);
  });

  it('should load value from database exactly', async () => {
    const mockTableAData = [{ id: '0668a953-629f-4d07-9176-e7aa1dcc9f2e', name: 'tableA2' }];

    const mockQueryBuilder: Partial<SelectQueryBuilder<TableA>> = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      getCount: jest.fn().mockResolvedValue(mockTableAData.length),
      getMany: jest.fn().mockResolvedValue(mockTableAData)
    };

    tableARepo.createQueryBuilder = jest.fn().mockReturnValue(mockQueryBuilder);

    const result = await testService.all();

    expect(result.listA).toEqual(mockTableAData);
    expect(result.countA).toBe(mockTableAData.length);
  });

  it('The instance should be able to call new() on TestService', () => {
    expect(testService).toBeTruthy();
  });
});
