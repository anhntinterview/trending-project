import TestController from './test.controller';
import { Container } from 'typedi';
import { TestsDTO } from './test.dto';

class TestModule {
  private testController = Container.get(TestController);

  getAll(): Promise<TestsDTO> {
    return this.testController.all();
  }
}

export default TestModule;
