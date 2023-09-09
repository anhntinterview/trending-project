import { Container } from 'typedi';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiOperationBase from '@/core/provider/api-operation.base';
import LoggerController from '@/logger/logger.controller';
import ApiProvider from '@/core/provider/singleton/api.provider';

class LoggerModule<T> extends ApiOperationBase<T> {
  constructor(protected readonly req: NextApiRequest, protected readonly res: NextApiResponse<T>) {
    super(req, res);
  }

  private loggerController = Container.get(LoggerController<T>);
  private readonly apiProvider = new ApiProvider<T>(this.req, this.res);

  async getEnvironment() {
    await this.apiProvider.handleHttpRequestResponse(
      'get', // method
      () => this.loggerController.environment() // callback
    );
  }
}

export default LoggerModule;
