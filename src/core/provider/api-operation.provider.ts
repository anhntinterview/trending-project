import { AppDataSource } from '@root/data-source';
import { Service } from 'typedi';
import { ErrorResponse } from './api-operation.abstract';
import ApiOperationBase from './api-operation.base';

@Service()
class ApiOperationProvider<T> extends ApiOperationBase<T> {
  async execute(callback: () => Promise<T>): Promise<void | ErrorResponse> {
    try {
      await AppDataSource.initialize();
      const result = await callback();
      this.sendResponse(result);
    } catch (error) {
      return this.sendErrorResponse({ message: error.message });
    } finally {
      await AppDataSource.destroy();
    }
  }

  private sendResponse(result: T): void {
    this.res.status(200).json(result);
  }

  private sendErrorResponse(error): ErrorResponse {
    this.res.status(400).json(error);
    return error;
  }

  constructor() {
    super();
  }
}

export default ApiOperationProvider;
