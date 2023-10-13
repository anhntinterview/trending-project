import { NextApiRequest, NextApiResponse } from 'next';
import { Service } from 'typedi';
import { AppDataSource } from '@root/data-source';
import { ErrorResponse, SuccessResponse } from '@/core/provider/api-operation.abstract';
import ApiOperationBase from '@/core/provider/api-operation.base';
import { MessageType, isNotVoid } from '@/util/type';

@Service()
class ApiOperationProvider extends ApiOperationBase {
  
  private _errorResponse: ErrorResponse;

  public set errorResponse(v: ErrorResponse) {
    this._errorResponse = v;
  }

  public get errorResponse(): ErrorResponse {
    return this._errorResponse;
  }

  async execute(callback: (bodyData?: unknown) => Promise<unknown>): Promise<unknown> {
    try {
      await this.initializeDBConnection();
      const rs = await callback()
      return this.sendSuccessResponse(rs)
    } catch (error) {
      console.log(`error from ISSUE API_OPERATATION: `, this.errorResponse);
      console.log(`error from CATCH API_OPERATATION: `,error);
      return this.sendErrorResponse();
    } finally {
      await AppDataSource.destroy();
    }
  }

  sendSuccessResponse(
    result: unknown,
    message?: MessageType
  ): void {
    if (isNotVoid(result)) {
      return this.res.status(200).json(result);
    } else {
      return this.res.status(200).json(message);
    }
  }

  sendErrorResponse() {
    return this.res.status(400).json(this.errorResponse);
  }

  

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
    this.allowCors();
  }
}

export default ApiOperationProvider;
