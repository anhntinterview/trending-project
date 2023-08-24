import { NextApiRequest, NextApiResponse } from 'next';
import { Service } from 'typedi';
import { DeleteResult } from 'typeorm';
import { AppDataSource } from '@root/data-source';
import { ErrorResponse, SuccessResponse } from '@/core/provider/api-operation.abstract';
import ApiOperationBase from '@/core/provider/api-operation.base';

@Service()
class ApiOperationProvider<T> extends ApiOperationBase<T> {
  async execute(
    callback: (bodyData?: T) => Promise<void | T | DeleteResult>
  ): Promise<void> {
    try {
      await AppDataSource.initialize();
      const result = await callback();
      this.sendResponse(result as T);
    } catch (error) {
      this.sendErrorResponse({ message: error.message });
    } finally {
      await AppDataSource.destroy();
    }
  }

  private sendResponse(result: T): void {
    this.res.status(200).json(result);
  }

  sendErrorResponse(error): ErrorResponse {
    this.res.status(400).json(error);
    return error;
  }

  constructor(req: NextApiRequest, res: NextApiResponse<SuccessResponse<T> | ErrorResponse>) {
    super(req, res);
  }
}

export default ApiOperationProvider;
