import { NextApiRequest, NextApiResponse } from 'next';
import { Service } from 'typedi';
import { AppDataSource } from '@root/data-source';
import { ErrorResponse, SuccessResponse } from '@/core/provider/api-operation.abstract';
import ApiOperationBase from '@/core/provider/api-operation.base';
import { MessageType, isNotVoid } from '@/util/type';

// B: BodyDataType
// R: ResultType

@Service()
class ApiOperationProvider extends ApiOperationBase {
  private allowedOrigins = ['http://localhost:4200'];

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
      const rs = await callback();
      return this.sendSuccessResponse(rs);
    } catch (error) {
      console.log(`error from ISSUE API_OPERATATION: `, this.errorResponse);
      console.log(`error from CATCH API_OPERATATION: `, error);
      return this.sendErrorResponse();
    } 
    // *** COMMENT THIS CAUSE OF ***
		// PERSISTENCE CONNECTION TO 
		// CONTINUITY HANDLE QUERY FROM CLIENT REQUEST
    // finally {
    //   await AppDataSource.destroy();
    // }
  }

  sendSuccessResponse(result: unknown, message?: MessageType): void {
    if (isNotVoid(result)) {
      return this.res.status(200).json(result);
    } else {
      return this.res.status(200).json(message);
    }
  }

  sendErrorResponse() {
    return this.res.status(400).json(this.errorResponse);
  }

  allowCors() {
    const origin = this.req.headers.origin as string;
    if (this.allowedOrigins.includes(origin)) {
      this.res.setHeader('Access-Control-Allow-Origin', origin);
      this.res.setHeader('Access-Control-Allow-Credentials', 'true');
      this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      this.res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
      );
    }
    if (this.req.method === 'OPTIONS') {
      // Xử lý yêu cầu OPTIONS và trả về trước
      this.res.status(200).end();
      return;
    }
  }

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
    this.allowCors();
  }
}

export default ApiOperationProvider;
