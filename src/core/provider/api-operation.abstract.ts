import { NextApiRequest, NextApiResponse } from 'next';

export type ErrorResponse = { [type: string]: unknown; } | undefined;
export type SuccessResponse<T> = T;

abstract class AbstractApiOperation {
    protected req: NextApiRequest;
    protected res: NextApiResponse;
    
    constructor(
      req: NextApiRequest, 
      res: NextApiResponse
    ) {
      this.req = req
      this.res = res
    }
}

export default AbstractApiOperation