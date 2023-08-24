import { NextApiRequest, NextApiResponse } from 'next';
import AbstractApiOperation, { ErrorResponse, SuccessResponse } from './api-operation.abstract';

abstract class ApiOperationBase<T> extends AbstractApiOperation<T> {
  constructor(req: NextApiRequest, res: NextApiResponse<SuccessResponse<T> | ErrorResponse>) {
    super(req, res);
  }
}

export default ApiOperationBase;
