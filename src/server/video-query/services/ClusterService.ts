/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResult } from '../models/SearchResult';
import type { VideoTimestamp } from '../models/VideoTimestamp';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ClusterService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Cluster
   * @returns SearchResult Successful Response
   * @throws ApiError
   */
  public clusterVideos({
    requestBody,
  }: {
    requestBody: Array<VideoTimestamp>,
  }): CancelablePromise<Array<SearchResult>> {
    return this.httpRequest.request({
      method: 'POST',
      url: '/cluster',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        422: `Validation Error`,
      },
    });
  }

}
