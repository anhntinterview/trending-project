import 'reflect-metadata';
import { LabEntity, TableA, TableB } from '@db/entity/test.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [TableA, TableB, LabEntity],
  migrations: [],
  subscribers: []
});
