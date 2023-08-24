import { Service } from 'typedi';
import ApiOperationBase from './api-operation.base';
import { DeleteResult } from 'typeorm';
import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse, SuccessResponse } from './api-operation.abstract';

@Service()
class MethodProvider<T> extends ApiOperationBase<T> {

  async get(callback: () => Promise<void | T>) {
    if (this.req.method === 'GET') {
      return await callback();
    } else {
      return this.res.status(405).json({ message: 'Only GET Method Allowed' });
    }
  }

  async post(callback: () => Promise<void | T>): Promise<void | T>  {
    if (this.req.method === 'POST') {
      return await callback();
    } else {
      return this.res.status(405).json({ message: 'Only POST Method Allowed' });
    }
  }

  async put(callback: () => Promise<void | T>): Promise<void | T>  {
    if (this.req.method === 'PUT') {
      return await callback();
    } else {
      return this.res.status(405).json({ message: 'Only PUT Method Allowed' });
    }
  }

  async patch(callback: () => Promise<void | T>): Promise<void | T>  {
    if (this.req.method === 'PATCH') {
      return await callback();
    } else {
      return this.res.status(405).json({ message: 'Only PATCH Method Allowed' });
    }
  }

  async delete(callback: () => Promise<void | DeleteResult>): Promise<void | DeleteResult>  {
    if (this.req.method === 'DELETE') {
      return await callback();
    } else {
      return this.res.status(405).json({ message: 'Only DELETE Method Allowed' });
    }
  }

  constructor(req: NextApiRequest, res: NextApiResponse<SuccessResponse<T> | ErrorResponse>) {
    super(req, res);
  }
}

export default MethodProvider;
