import { NextApiRequest, NextApiResponse } from 'next';
import ApiOperationProvider from '@/core/provider/api-operation.provider';
import MethodProvider from '@/core/provider/method.provider';
import { APIMethodType, APIParameterType } from '@root/type/entity/common';

class ApiProvider extends ApiOperationProvider {
  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
  }

  protected readonly methodProvider = new MethodProvider(this.req, this.res);

  public async handleUrlParamResponse(
    method: APIMethodType,
    callback: (param: undefined | string | Array<string>) => Promise<unknown>
  ) {
    const param = this.req.query.param ? this.req.query.param : this.req.query.id;
    console.log(`param: `,param);
    if (param) {
      await this.methodProvider[method](() => this.execute(() => callback(param)));
    } else {
      this.errorResponse = { message: 'param was not defined' };
      return this.sendErrorResponse();
    }
  }

  public async handleBodyDataResponse(method: APIMethodType, callback: (bodyData: unknown) => Promise<unknown>) {
    console.log(`----- this.req.body:`, this.req.body);
    const bodyData = typeof this.req.body === 'string' ? JSON.parse(this.req.body) : this.req.body;

    if (bodyData) {
      await this.methodProvider[method](() => this.execute(() => callback(bodyData)));
    } else {
      this.errorResponse = { error: 'bodyData was not defined' };
      return this.sendErrorResponse();
    }
  }

  public async handleHttpRequestResponse(
    method: APIMethodType,
    callback: (id?: undefined | string | Array<string>, bodyData?: unknown) => Promise<unknown>,
    APIParameter?: APIParameterType
  ) {
    switch (APIParameter) {
      case APIParameterType.BODY_DATA:
        return await this.handleBodyDataResponse(method, (bodyData) => callback(undefined, bodyData));
      case APIParameterType.URL_PARAM:
        return await this.handleUrlParamResponse(method, (id) => callback(id));
      default:
        return await this.methodProvider[method](() => this.execute(() => callback()));
    }
  }
}

export default ApiProvider;
