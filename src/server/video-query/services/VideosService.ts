/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseVideo } from '../models/BaseVideo';
import type { CreateVideo } from '../models/CreateVideo';
import type { SummaryNode } from '../models/SummaryNode';
import type { VideoTimestamp } from '../models/VideoTimestamp';
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
   * Upload Audio Video
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
   * @returns YoutubeVideo Successful Response
   * @throws ApiError
   */
  public getVideo({
    id,
  }: {
    id: string,
  }): CancelablePromise<YoutubeVideo> {
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

  /**
   * Summarize Video
   * @returns SummaryNode Successful Response
   * @throws ApiError
   */
  public summaryVideo({
    id,
  }: {
    id: string,
  }): CancelablePromise<Array<SummaryNode>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/videos/{id}/summary',
      path: {
        'id': id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Video Transcript
   * @returns VideoTimestamp Successful Response
   * @throws ApiError
   */
  public videoTranscript({
    id,
    start,
    limit = 20,
  }: {
    id: string,
    start?: number,
    limit?: number,
  }): CancelablePromise<Array<VideoTimestamp>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/videos/{id}/transcript',
      path: {
        'id': id,
      },
      query: {
        'start': start,
        'limit': limit,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

}
