import { NextApiRequest, NextApiResponse } from 'next';
import { DeleteResult } from 'typeorm';
import { validate } from 'class-validator';
import ApiOperationProvider from '@/core/provider/api-operation.provider';
import MethodProvider from '@/core/provider/method.provider';
import { EntityError } from '@/util/type';

class ApiProvider<T> extends ApiOperationProvider<T> {
  protected readonly methodProvider = new MethodProvider<T>(this.req, this.res);

  constructor(protected readonly req: NextApiRequest, protected readonly res: NextApiResponse<T>) {
    super(req, res);
  }

  public async handleUrlParamResponse(
    method: string,
    callback: (id: undefined | string | Array<string>) => Promise<void | T | DeleteResult | EntityError>
  ) {
    const { id } = this.req.query;
    if (id) {
      await this.methodProvider[method](() => this.execute(() => callback(id)));
    } else {
      return this.sendErrorResponse({ message: 'id was not defined' });
    }
  }

  public async handleBodyDataResponse(
    method: string,
    callback: (bodyData: T | string | Array<T> ) => Promise<void | T | DeleteResult | EntityError>,
    isValidate: boolean
  ) {
    const { bodyData } = this.req.body;
    
    if (bodyData) {
      if (Array.isArray(bodyData)) {
        if (isValidate) {
          bodyData.map(async (item) => {
            const singleRecordErrors = await validate(item as object);
            if (singleRecordErrors.length > 0) {
              return this.sendErrorResponse({
                error: singleRecordErrors.map((err) => err.constraints)
              });
            }
          });
        }
        await this.methodProvider[method](() => this.execute(() => callback(bodyData as T)));
      } else {
        const bodyDataErrors = await validate(bodyData as object);
        if (isValidate && bodyDataErrors.length > 0) {
          return this.sendErrorResponse({
            error: bodyDataErrors.map((err) => err.constraints)
          });
        } else {
          await this.methodProvider[method](() => this.execute(() => callback(bodyData)));
        }
      }
    } else {
      return this.sendErrorResponse({ error: 'bodyData was not defined' });
    }
  }

  public async handleHttpRequestResponse(
    method: string,
    callback: (
      id?: undefined | string | Array<string>,
      bodyData?: T | string | Array<T>
    ) => Promise<void | T | DeleteResult | EntityError>,
    hasParam?: boolean,
    hasBodyData?: boolean,
  ) {
    if (hasParam) {
      await this.handleUrlParamResponse(method, (id) => callback(id))
    } else if (hasBodyData) {
      await this.handleBodyDataResponse(method, (bodyData) => callback(undefined, bodyData), true);
    } else {
      await this.methodProvider[method](() => this.execute(() => callback()));
    }
  }
}

export default ApiProvider;
