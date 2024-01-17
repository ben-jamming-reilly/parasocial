/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResult } from '../models/SearchResult';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SearchService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Search Videos
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
   * Similar Videos
   * @returns any Successful Response
   * @throws ApiError
   */
  public allSimilarVideos({
    query,
    author,
  }: {
    query: string,
    author: string,
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/similar',
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
   * @returns any Successful Response
   * @throws ApiError
   */
  public searchVideo({
    id,
    query,
  }: {
    id: string,
    query: string,
  }): CancelablePromise<any> {
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

  /**
   * Summarize Video
   * @returns any Successful Response
   * @throws ApiError
   */
  public summaryVideo({
    id,
    query,
  }: {
    id: string,
    query: string,
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/videos/{id}/summary',
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
