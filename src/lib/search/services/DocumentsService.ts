/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { YoutubeVideo } from '../models/YoutubeVideo';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class DocumentsService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Get All Documents
   * @returns YoutubeVideo Successful Response
   * @throws ApiError
   */
  public allDocuments({
    author,
    skip,
    limit = 100,
  }: {
    author?: (string | null),
    skip?: number,
    limit?: number,
  }): CancelablePromise<Array<YoutubeVideo>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/documents',
      query: {
        'author': author,
        'skip': skip,
        'limit': limit,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Document
   * @returns YoutubeVideo Successful Response
   * @throws ApiError
   */
  public getDocument({
    id,
  }: {
    id: string,
  }): CancelablePromise<YoutubeVideo> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/documents/{id}',
      path: {
        'id': id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

}
