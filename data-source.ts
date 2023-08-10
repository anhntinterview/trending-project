import 'reflect-metadata';
import { LabEntity, TableA, TableB } from '@db/entity/test.entity';
import { DataSource } from 'typeorm';

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
    entities: [TableA, TableB, LabEntity],
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
