import { TableB, TableA } from '@db/entity/test.entity';
import { Repository } from 'typeorm';
import { TableARepo, TableBRepo } from '@/test/test.repository';
import { Service } from 'typedi';

@Service()
class LoggerService<T> {
  constructor() {}
  
  async environment(): Promise<T> {
    const env = {
      NODE_ENV: process.env.NODE_ENV,
      APP_ENV: process.env.APP_ENV,
      HOST: process.env.HOST,
      HOST_PORT: process.env.HOST_PORT,
      DB_HOST: process.env.DB_HOST,
      DB_DATABASE: process.env.DB_DATABASE,
    }
    return { env } as T;
  }
}
export default LoggerService;
