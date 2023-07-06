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
     * @param channelId
     * @returns YoutubeProfile Successful Response
     * @throws ApiError
     */
    public getYoutube(
        channelId: string,
    ): CancelablePromise<YoutubeProfile> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/youtube/{channel_id}',
            path: {
                'channel_id': channelId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
