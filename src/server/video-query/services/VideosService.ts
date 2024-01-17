/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseVideo } from '../models/BaseVideo';
import type { CreateVideo } from '../models/CreateVideo';
import type { YoutubeVideo } from '../models/YoutubeVideo';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class VideosService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Get All Videos
   * @returns YoutubeVideo Successful Response
   * @throws ApiError
   */
  public getAllVideos({
    author,
    skip,
    limit = 100,
  }: {
    author?: string,
    skip?: number,
    limit?: number,
  }): CancelablePromise<Array<YoutubeVideo>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/videos',
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
   * Upload Video
   * @returns any Successful Response
   * @throws ApiError
   */
  public upload({
    requestBody,
  }: {
    requestBody: CreateVideo,
  }): CancelablePromise<(BaseVideo | YoutubeVideo)> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/videos',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Video
   * @returns any Successful Response
   * @throws ApiError
   */
  public getVideo({
    id,
  }: {
    id: string,
  }): CancelablePromise<any> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/videos/{id}',
      path: {
        'id': id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

}
