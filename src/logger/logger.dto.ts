import { TableA, TableB } from '@db/entity/test.entity';

export interface EnnvironmentDTO {
  NODE_ENV: string;
  APP_ENV: string;
  HOST: string;
  HOST_PORT: string;
  DB_HOST: string;
  DB_DATABASE: string;
}
