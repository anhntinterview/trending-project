import { TableA, TableB } from '@db/entity/test.entity';

export interface EnnvironmentDTO {
  APP_ENV: string;
  HOST: string
  DB_HOST: string;
  DB_DATABASE: string;
}
