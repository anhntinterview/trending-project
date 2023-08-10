import { NextApiRequest, NextApiResponse } from 'next';
import AbstractApiOperation, { ErrorResponse, SuccessResponse } from './api-operation.abstract';

abstract class ApiOperationBase<T> extends AbstractApiOperation<T> {
  constructor() {
    super();
  }

  public async initialize(
    req: NextApiRequest,
    res: NextApiResponse<SuccessResponse<T> | ErrorResponse>
  ): Promise<void> {
    this.req = req;
    this.res = res;
  }
}

export default ApiOperationBase;
