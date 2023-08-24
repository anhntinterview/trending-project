import TestController from './test.controller';
import { Container } from 'typedi';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiProvider from '@/core/provider/singleton/api.provider';
import ApiOperationBase from '@/core/provider/api-operation.base';

class TestModule<T> extends ApiOperationBase<T>  {
  constructor(protected readonly req: NextApiRequest, protected readonly res: NextApiResponse<T>) {
    super(req, res);
  }
  
  private testController = Container.get(TestController<T>);
  private readonly apiProvider = new ApiProvider<T>(this.req, this.res);

  async getAll() {
    await this.apiProvider.handleHttpRequestResponse(
      'get', // method
      () => this.testController.all() // callback
    );
  }
}

export default TestModule;
