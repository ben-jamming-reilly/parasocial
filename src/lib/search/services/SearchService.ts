/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResult } from '../models/SearchResult';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SearchService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Query All Segments
   * @returns SearchResult Successful Response
   * @throws ApiError
   */
  public querySegments({
    query,
    skip,
    limit = 20,
  }: {
    query: string,
    skip?: number,
    limit?: number,
  }): CancelablePromise<Array<SearchResult>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/search',
      query: {
        'query': query,
        'skip': skip,
        'limit': limit,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Find All Similar Segments
   * @returns SearchResult Successful Response
   * @throws ApiError
   */
  public similarSegments({
    url,
    start,
    end,
    skip,
    limit = 20,
  }: {
    url: string,
    start: number,
    end: number,
    skip?: number,
    limit?: number,
  }): CancelablePromise<Array<SearchResult>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/similar',
      query: {
        'url': url,
        'start': start,
        'end': end,
        'skip': skip,
        'limit': limit,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Search Document Segments From Author
   * @returns SearchResult Successful Response
   * @throws ApiError
   */
  public querySegmentsFromProfile({
    author,
    query,
    skip,
    limit = 100,
  }: {
    author: string,
    query: string,
    skip?: number,
    limit?: number,
  }): CancelablePromise<Array<SearchResult>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/profiles/{author}/search',
      path: {
        'author': author,
      },
      query: {
        'query': query,
        'skip': skip,
        'limit': limit,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Search Similar Document Segments By Author
   * @returns SearchResult Successful Response
   * @throws ApiError
   */
  public similarSegmentsFromProfile({
    author,
    url,
    start,
    end,
    skip,
    limit,
  }: {
    author: string,
    url: string,
    start: number,
    end: number,
    skip?: any,
    limit?: any,
  }): CancelablePromise<Array<SearchResult>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/profiles/{author}/similar',
      path: {
        'author': author,
      },
      query: {
        'url': url,
        'start': start,
        'end': end,
        'skip': skip,
        'limit': limit,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Search Segments From Document
   * @returns SearchResult Successful Response
   * @throws ApiError
   */
  public querySegmentsFromDocument({
    id,
    query,
    skip,
    limit,
  }: {
    id: string,
    query: string,
    skip?: any,
    limit?: any,
  }): CancelablePromise<Array<SearchResult>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/documents/{id}/search',
      path: {
        'id': id,
      },
      query: {
        'query': query,
        'skip': skip,
        'limit': limit,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Similar Segments From Document
   * @returns SearchResult Successful Response
   * @throws ApiError
   */
  public similarSegmentsFromDocument({
    id,
    start,
    end,
    skip,
    limit,
  }: {
    id: string,
    start: number,
    end: number,
    skip?: any,
    limit?: any,
  }): CancelablePromise<Array<SearchResult>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/documents/{id}/similar',
      path: {
        'id': id,
      },
      query: {
        'start': start,
        'end': end,
        'skip': skip,
        'limit': limit,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

}
