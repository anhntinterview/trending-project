import { TableA, TableB } from "@db/entity/test.entity";
import { AppDataSource } from "@root/data-source";

export const TableARepo =  AppDataSource.getRepository(TableA)

export const TableBRepo =  AppDataSource.getRepository(TableB)