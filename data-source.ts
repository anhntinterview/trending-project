import 'reflect-metadata';
import { LabEntity, TableA, TableB, TableC } from '@db/entity/test.entity';
import { DataSource } from 'typeorm';
import { Customer } from '@db/entity/customer.entity';
import { CustomerAddress } from '@db/entity/customer-address.entity';
import { CustomerSession } from '@db/entity/customer-session.entity';
import { Role } from '@db/entity/role.entity';
import { Post } from '@db/entity/post.entity';
import { Tag } from '@db/entity/tag.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '159.223.71.223',
  port: 5432,
  username: 'admin',
  password: '221089abcdE%',
  database: 'elabdev',
  synchronize: true,
  logging: false,
  // entities: [path.join(__dirname, './src/database/entity/*.*')],
  // entities: [__dirname + "src/database/entity/**/*.ts"],
  // entities: ["src/database/entity/**/*.ts"],
  entities: [Customer, TableA, TableB, TableC, LabEntity, CustomerAddress, Role, Post, Tag],
  migrations: [],
  subscribers: []
});

// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: 5432,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   synchronize: true,
//   logging: false,
//   // entities: [path.join(__dirname, './src/database/entity/*.*')],
//   // entities: [__dirname + "src/database/entity/**/*.ts"],
//   // entities: ["src/database/entity/**/*.ts"],
//   entities: [TableA, TableB, LabEntity, Customer, CustomerAddress, CustomerSession],
//   migrations: [],
//   subscribers: []
// });
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
