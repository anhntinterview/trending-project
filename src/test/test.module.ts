import TestController from './test.controller';
import { Container } from 'typedi';
import { TestsDTO } from './test.dto';
import { NextApiRequest, NextApiResponse } from 'next';
import { AppDataSource } from '@root/data-source';

class TestModule {
  constructor(private req: NextApiRequest, private res: NextApiResponse<any>) {}
  private testController = Container.get(TestController);

  async getAll(): Promise<TestsDTO | void> {
    return await this.testController.all();
  }

  async main() {
    if (this.req.method === 'GET') {
      try {
        await AppDataSource.initialize();

        const rs = await this.getAll();
        
        await AppDataSource.destroy();
        return this.res.status(200).json(rs);
      } catch (error: any) {
        return this.res.status(400).json({ message: error.message });
      }
    } else {
      // 405 Method Not Allowed
      return this.res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
}

export default TestModule;
