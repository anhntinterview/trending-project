import { NextApiRequest, NextApiResponse } from 'next';
import AbstractApiOperation, { ErrorResponse, SuccessResponse } from './api-operation.abstract';
import { AppDataSource } from '@root/data-source';

abstract class ApiOperationBase extends AbstractApiOperation {
  private allowedOrigins = [
    'http://localhost:4200', 
  ];

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

  allowCors() {
    const origin = this.req.headers.origin as string;
    if (this.allowedOrigins.includes(origin)) {
      this.res.setHeader('Access-Control-Allow-Origin', origin);
      this.res.setHeader('Access-Control-Allow-Credentials', 'true');
      this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      this.res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
      );
    }
    if (this.req.method === 'OPTIONS') {
      // Xử lý yêu cầu OPTIONS và trả về trước
      this.res.status(200).end();
      return;
    }
  }
}

export default ApiOperationBase;
