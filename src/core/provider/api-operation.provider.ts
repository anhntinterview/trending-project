import { NextApiRequest, NextApiResponse } from 'next';
import { Service } from 'typedi';
import { DeleteResult } from 'typeorm';
import { AppDataSource } from '@root/data-source';
import { ErrorResponse, SuccessResponse } from '@/core/provider/api-operation.abstract';
import ApiOperationBase from '@/core/provider/api-operation.base';
import { EntityError, isNotVoid } from '@/util/type';

// B: BodyDataType
// R: ResultType

@Service()
class ApiOperationProvider<T> extends ApiOperationBase<T> {
  async execute(callback: (bodyData?: unknown) => Promise<void | T | DeleteResult | EntityError>): Promise<void> {
    try {
      await this.initializeDBConnection();
      const result = await callback();
      this.sendSuccessResponse(result as T | void);
    } catch (error) {
      this.sendErrorResponse({ message: error.message });
    } finally {
      await AppDataSource.destroy();
    }
  }

  sendSuccessResponse(result: T | void, message?: unknown): void {
    if (isNotVoid(result)) {
      this.res.status(200).json(result);
    } else {
      this.successMessageResponse(message)
    }
  }

  private successMessageResponse(message) {
    this.res.status(200).json(message);
    return message;
  }

  sendErrorResponse(error) {
    this.res.status(401).json(error);
  }

  constructor(req: NextApiRequest, res: NextApiResponse<SuccessResponse<T> | ErrorResponse>) {
    super(req, res);
  }
}

export default ApiOperationProvider;
