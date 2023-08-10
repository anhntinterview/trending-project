import TestController from './test.controller';
import { Container } from 'typedi';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiOperationProvider from '@/core/provider/api-operation.provider';

function isNotVoid<T>(value: T | void): value is T {
  return value !== undefined;
}

class TestModule<T> {
  constructor(private readonly req: NextApiRequest,private readonly res: NextApiResponse<T>) {}
  
  private testController = Container.get(TestController<T>);
  private readonly apiOperationProvider = Container.get(ApiOperationProvider<T>);

  async getAll() {
    await this.apiOperationProvider.initialize(this.req, this.res);
    if(isNotVoid<T>){
      await this.apiOperationProvider.execute(
        () => this.testController.all(this.req, this.res) as Promise<T>
      );
    }
  }

  async main() {
    await this.getAll();
  }
}

export default TestModule;
