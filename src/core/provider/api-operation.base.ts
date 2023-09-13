import { NextApiRequest, NextApiResponse } from 'next';
import AbstractApiOperation, { ErrorResponse, SuccessResponse } from './api-operation.abstract';
import { AppDataSource } from '@root/data-source';

abstract class ApiOperationBase extends AbstractApiOperation {
  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
  }

  protected async initializeDBConnection() {
    try {
      await AppDataSource.initialize();
    } catch (error) {
      console.error(`Error of Database Connection: `, error);
    }
  }

  protected async closeDBConnection() {
    if (AppDataSource.isInitialized) {
      try {
        await AppDataSource.destroy();
      } catch (error) {
        console.error(`Error of Database Connection: `, error);
      }
    } else {
      console.log('App is not initialize');
    }
  }

  protected async restartDBConnection() {
    if (AppDataSource.isInitialized) {
      try {
        await AppDataSource.destroy();
        await AppDataSource.initialize();
      } catch (error) {
        console.error(`Error of Database Connection: `, error);
      }
    } else {
      try {
        await AppDataSource.initialize();
      } catch (error) {
        console.error(`Error of Database Connection: `, error);
      }
    }
  }
}

export default ApiOperationBase;
