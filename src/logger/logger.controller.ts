import { Container, Service } from 'typedi';
import LoggerService from '@/logger/logger.service';

@Service()
class LoggerController<T> {
  private loggerService = Container.get(LoggerService<T>);

  async environment(): Promise<void | T> {
    return await this.loggerService.environment();
  }
}

export default LoggerController;
