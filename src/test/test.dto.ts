import { TableA, TableB } from '@db/entity/test.entity';

export interface TestsDTO {
  listA: Array<TableA>;
  countA: number;
  listB: Array<TableB>;
  countB: number;
}

export interface TestRO {
  customer: TableA | null;
}
