/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResult } from '../models/SearchResult';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SearchService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Search All Videos
   * @returns SearchResult Successful Response
   * @throws ApiError
   */
  public searchAllVideos({
    query,
    author,
  }: {
    query: string,
    author?: string,
  }): CancelablePromise<Array<SearchResult>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/search',
      query: {
        'query': query,
        'author': author,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Search Video
   * @returns SearchResult Successful Response
   * @throws ApiError
   */
  public searchVideo({
    id,
    query,
  }: {
    id: string,
    query: string,
  }): CancelablePromise<Array<SearchResult>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/videos/{id}/search',
      path: {
        'id': id,
      },
      query: {
        'query': query,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

}
