import { Service } from 'typedi';
import ApiOperationBase from './api-operation.base';
import { DeleteResult } from 'typeorm';
import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse, SuccessResponse } from './api-operation.abstract';

@Service()
class MethodProvider extends ApiOperationBase {

  async get(callback: () => Promise<unknown>) {
    if (this.req.method === 'GET') {
      return await callback();
    } else {
      return this.res.status(405).json({ message: 'Only GET Method Allowed' });
    }
  }

  async post(callback: () => Promise<unknown>)  {
    if (this.req.method === 'POST') {
      return await callback();
    } else {
      return this.res.status(405).json({ message: 'Only POST Method Allowed' });
    }
  }

  async put(callback: () => Promise<unknown>) {
    if (this.req.method === 'PUT') {
      return await callback();
    } else {
      return this.res.status(405).json({ message: 'Only PUT Method Allowed' });
    }
  }

  async patch(callback: () => Promise<unknown>)  {
    if (this.req.method === 'PATCH') {
      return await callback();
    } else {
      return this.res.status(405).json({ message: 'Only PATCH Method Allowed' });
    }
  }

  async delete(callback: () => Promise<unknown>)  {
    if (this.req.method === 'DELETE') {
      return await callback();
    } else {
      return this.res.status(405).json({ message: 'Only DELETE Method Allowed' });
    }
  }

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
  }
}

export default MethodProvider;
