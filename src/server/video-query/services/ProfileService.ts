/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { YoutubeProfile } from '../models/YoutubeProfile';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ProfileService {

  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Get All Profiles
   * @returns YoutubeProfile Successful Response
   * @throws ApiError
   */
  public getAllProfiles(): CancelablePromise<Array<YoutubeProfile>> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/profiles',
    });
  }

  /**
   * Get Profile
   * @returns YoutubeProfile Successful Response
   * @throws ApiError
   */
  public getProfile({
    author,
  }: {
    author: string,
  }): CancelablePromise<YoutubeProfile> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/profiles/{author}',
      path: {
        'author': author,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Get Youtube Profile
   * @returns YoutubeProfile Successful Response
   * @throws ApiError
   */
  public getYoutube({
    author,
  }: {
    author: string,
  }): CancelablePromise<YoutubeProfile> {
    return this.httpRequest.request({
      method: 'GET',
      url: '/youtube/{author}',
      path: {
        'author': author,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

}
