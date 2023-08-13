import LoggerController from './logger.controller';
import { Container } from 'typedi';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiOperationProvider from '@/core/provider/api-operation.provider';

function isNotVoid<T>(value: T | void): value is T {
  return value !== undefined;
}

class LoggerModule<T> {
  constructor(private readonly req: NextApiRequest,private readonly res: NextApiResponse<T>) {}
  
  private loggerController = Container.get(LoggerController<T>);
  private readonly apiOperationProvider = Container.get(ApiOperationProvider<T>);

  async getEnvironment() {
    await this.apiOperationProvider.initialize(this.req, this.res);
    if(isNotVoid<T>){
      await this.apiOperationProvider.execute(
        () => this.loggerController.environment(this.req, this.res) as Promise<T>
      );
    }
  }

  async main() {
    await this.getEnvironment();
  }
}

export default LoggerModule;
