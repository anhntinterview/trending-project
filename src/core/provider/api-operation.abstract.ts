import { NextApiRequest, NextApiResponse } from 'next';

export type ErrorResponse = { message: string };
export type SuccessResponse<T> = T;

abstract class AbstractApiOperation<T> {
    protected req!: NextApiRequest;
    protected res!: NextApiResponse<SuccessResponse<T> | ErrorResponse>;
    
    constructor() {}

    public abstract initialize(
        req: NextApiRequest, 
        res: NextApiResponse<SuccessResponse<T> | ErrorResponse>
      ): Promise<void>
}

export default AbstractApiOperation