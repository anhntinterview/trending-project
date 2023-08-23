import 'reflect-metadata';
import { LabEntity, TableA, TableB } from '@db/entity/test.entity';
import { DataSource } from 'typeorm';
import { Customer } from '@db/entity/customer.entity';
import { CustomerAddress } from '@db/entity/customer-address.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  // entities: [path.join(__dirname, './src/database/entity/*.*')],
  // entities: [__dirname + "src/database/entity/**/*.ts"],
  // entities: ["src/database/entity/**/*.ts"],
  entities: [TableA, TableB, LabEntity, Customer, CustomerAddress],
  migrations: [],
  subscribers: []
});
// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "221089abcdE%",
//     database: "postgres",
//     synchronize: true,
//     logging: false,
//     entities: ["src/database/entity/**/*.ts"],
//     migrations: [],
//     subscribers: [],
// })
