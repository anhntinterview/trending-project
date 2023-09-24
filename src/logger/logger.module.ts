import { Container } from 'typedi';
import { NextApiRequest, NextApiResponse } from 'next';
import LoggerController from '@/logger/logger.controller';
import ApiProvider from '@/core/provider/singleton/api.provider';
import { APIMethodType } from '@root/type/entity/common';

class LoggerModule extends ApiProvider {
  constructor(protected readonly req: NextApiRequest, protected readonly res: NextApiResponse) {
    super(req, res);
  }

  private loggerController = Container.get(LoggerController);

  async getEnvironment() {
    await this.handleHttpRequestResponse(
      APIMethodType.GET, // method
      () => this.loggerController.environment() // callback
    );
  }
}

export default LoggerModule;
