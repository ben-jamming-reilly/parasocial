/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { YoutubeProfile } from '../models/YoutubeProfile';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ProfileService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get Youtube Profile
     * @param channel
     * @returns YoutubeProfile Successful Response
     * @throws ApiError
     */
    public getYoutube(
        channel: string,
    ): CancelablePromise<YoutubeProfile> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/youtube/{channel}',
            path: {
                'channel': channel,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Profiles
     * @returns YoutubeProfile Successful Response
     * @throws ApiError
     */
    public getAllProfiles(): CancelablePromise<Array<YoutubeProfile>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/profiles',
        });
    }

}
