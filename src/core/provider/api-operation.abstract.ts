import { NextApiRequest, NextApiResponse } from 'next';

export type ErrorResponse = { message: string };
export type SuccessResponse<T> = T;

abstract class AbstractApiOperation<T> {
    protected req: NextApiRequest;
    protected res: NextApiResponse<SuccessResponse<T> | ErrorResponse>;
    
    constructor(
      req: NextApiRequest, 
      res: NextApiResponse<SuccessResponse<T> | ErrorResponse>
    ) {
      this.req = req
      this.res = res
    }
}

export default AbstractApiOperation