import { NextApiRequest, NextApiResponse } from 'next';
import TestService from '@/test/test.service';
import { Container, Service } from 'typedi';
import MethodProvider from '@/core/provider/method.provider';

@Service()
class TestController<T> {
  private testService = Container.get(TestService<T>);
  private readonly methodProvider = Container.get(MethodProvider<T>);

  async all(
    req: NextApiRequest,
    res: NextApiResponse<T>
  ): Promise<void | T> {
    await this.methodProvider.initialize(req, res);
    return await this.methodProvider.get(() => this.testService.all());
  }
}

export default TestController;
