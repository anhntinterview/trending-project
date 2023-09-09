import { NextApiRequest, NextApiResponse } from 'next';
import TestService from '@/test/test.service';
import { Container, Service } from 'typedi';
import MethodProvider from '@/core/provider/method.provider';

@Service()
class TestController<T> {
  private testService = Container.get(TestService<T>);

  async all(): Promise<void | T> {
    return await this.testService.all();
  }
}

export default TestController;
