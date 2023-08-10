import TestService from './test.service';
import { TableA, TableB } from '@db/entity/test.entity';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { mock } from 'jest-mock-extended';
import { TableARepo } from './test.repository';

// Mock getRepository function
beforeAll(
  async () =>
    await jest.mock('typeorm', () => ({
      getRepository: jest.fn(),
      // getRepository: jest.fn((entity) => {
      //   if (entity === TableA) {
      //     return tableARepoMock;
      //   } else if (entity === TableB) {
      //     return tableBRepoMock;
      //   } else {
      //     throw new Error('Invalid entity for mock.');
      //   }
      // }),
      BaseEntity: class Mock {},
      Entity: jest.fn(),
      PrimaryGeneratedColumn: jest.fn(),
      Column: jest.fn(),
      ManyToMany: jest.fn(),
      JoinTable: jest.fn(),
      initialize: jest.fn(),
    }))
);

afterAll(
  async () =>
    await jest.mock('typeorm', () => ({
      destroy: jest.fn()
    }))
);

// Mock TableA and TableB repositories
const tableARepoMock = mock<Repository<TableA>>();
const queryBuilderAMock = mock<SelectQueryBuilder<TableA>>();

// const tableBRepoMock = mock<Repository<TableB>>();
// const queryBuilderBMock = mock<SelectQueryBuilder<TableB>>();

queryBuilderAMock.where.mockReturnThis();
queryBuilderAMock.select.mockReturnThis();
tableARepoMock.createQueryBuilder.mockReturnValue(queryBuilderAMock);

//   queryBuilderBMock.where.mockReturnThis();
//   queryBuilderBMock.select.mockReturnThis();
//   tableBRepoMock.createQueryBuilder.mockReturnValue(queryBuilderBMock);

jest.mock('@/test/test.repository', () => ({
  AppDataSource: jest.fn(() => {
    return {
      createQueryBuilder: jest.fn()
    };
  })
}));

// Mock QueryBuilder methods
const queryBuilderMock = mock<SelectQueryBuilder<TableA>>();
queryBuilderMock.leftJoinAndSelect.mockReturnThis();
queryBuilderMock.getCount.mockResolvedValue(2); // Mock count result
queryBuilderMock.getMany.mockResolvedValue([
  { id: 1, name: 'TableA1', tableBs: [] },
  { id: 2, name: 'TableA2', tableBs: [] }
]); // Mock list result

// Mock createQueryBuilder
tableARepoMock.createQueryBuilder.mockReturnValue(queryBuilderMock);

// Unit Test
describe('TestService', () => {
  /*
  beforeEach(() => {
    // Reset mocks before each test
    tableARepoMock.createQueryBuilder.mockClear();
    // tableBRepoMock.createQueryBuilder.mockClear();

    // Set up QueryBuilder mock
    queryBuilderAMock.leftJoinAndSelect.mockReturnThis();
    queryBuilderAMock.getCount.mockResolvedValue(2); // Mock count result
    queryBuilderAMock.getMany.mockResolvedValue([
      { id: 1, name: 'TableA1', tableBs: [] },
      { id: 2, name: 'TableA2', tableBs: [] }
    ]); // Mock list result

    // Set up createQueryBuilder mocks for each repository
    tableARepoMock.createQueryBuilder.mockReturnValue(queryBuilderAMock);
    // tableBRepoMock.createQueryBuilder.mockReturnValue(queryBuilderBMock);

    // Mock TypeORM getRepository function
    jest.mock('typeorm', () => {
      return {
        getRepository: jest.fn((entity) => tableARepoMock),
        // getRepository: jest.fn((entity) => {
        //   if (entity === TableA) {
        //     return tableARepoMock;
        //   } else if (entity === TableB) {
        //     return tableBRepoMock;
        //   } else {
        //     throw new Error('Invalid entity for mock.');
        //   }
        // }),
        BaseEntity: class Mock {},
        Entity: jest.fn(),
        PrimaryGeneratedColumn: jest.fn(),
        Column: jest.fn(),
        ManyToMany: jest.fn(),
        JoinTable: jest.fn()
        // Other TypeORM decorators and classes you might need to mock
      };
    });
  });
  */

  // Test the first version of the all() method
  it('should fetch all TableA with their associated TableB using find()', async () => {
    // Arrange
    // Set up any necessary data or mocks if needed

    // Act
    const testService = new TestService<Record<string, any>>();
    const result = await testService.all();
    console.log(`------------------`, result);

    // Assert
    expect(result).toBeDefined();
    // Add more assertions based on the expected result
  });

  // // Test the second version of the all() method
  // it('should fetch all TableA with their associated TableB using createQueryBuilder()', async () => {
  //   // Arrange
  //   // Set up any necessary data or mocks if needed

  //   // Act
  //   const testService = new TestService<Record<string, any>>();
  //   const result = await testService.all();

  //   // Assert
  //   expect(result).toBeDefined();
  //   // Add more assertions based on the expected result
  // });
});
