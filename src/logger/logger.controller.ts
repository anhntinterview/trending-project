import { NextApiRequest, NextApiResponse } from 'next';
import LoggerService from '@/logger/logger.service';
import { Container, Service } from 'typedi';
import MethodProvider from '@/core/provider/method.provider';

@Service()
class LoggerController<T> {
  private loggerService = Container.get(LoggerService<T>);
  private readonly methodProvider = Container.get(MethodProvider<T>);

  async environment(
    req: NextApiRequest,
    res: NextApiResponse<T>
  ): Promise<void | T> {
    await this.methodProvider.initialize(req, res);
    return await this.methodProvider.get(() => this.loggerService.environment());
  }
}

export default LoggerController;
