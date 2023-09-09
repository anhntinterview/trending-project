import 'reflect-metadata';
import { LabEntity, TableA, TableB, TableC } from '@db/entity/test.entity';
import { DataSource } from 'typeorm';
import { Customer } from '@db/entity/customer.entity';
import { CustomerAddress } from '@db/entity/customer-address.entity';
import { CustomerSession } from '@db/entity/customer-session.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '159.223.71.223',
  port: 5432,
  username: 'admin',
  password: '221089abcdE%',
  database: 'elabdev',
  synchronize: true,
  logging: false,
  entities: [Customer, TableA, TableB, TableC, LabEntity, CustomerSession, CustomerAddress],
  migrations: [],
  subscribers: [],
});
