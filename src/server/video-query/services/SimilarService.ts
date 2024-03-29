/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResult } from '../models/SearchResult';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SimilarService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Similar
   * @returns SearchResult Successful Response
   * @throws ApiError
   */
  public similarVideo({
    id,
    start,
    end,
    author = '',
  }: {
    id: string,
    start: number,
    end: number,
    author?: string,
  }): CancelablePromise<Array<SearchResult>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/videos/{id}/similar',
      path: {
        'id': id,
      },
      query: {
        'start': start,
        'end': end,
        'author': author,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

}
