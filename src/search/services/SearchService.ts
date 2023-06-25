/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseDocument } from '../models/BaseDocument';
import type { SearchSegment } from '../models/SearchSegment';
import type { YoutubeDocument } from '../models/YoutubeDocument';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SearchService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Search Document Segments By Query
     * @param query
     * @param author
     * @param skip
     * @param limit
     * @returns SearchSegment Successful Response
     * @throws ApiError
     */
    public documentSegmentsByQuery(
        query: string,
        author?: string,
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<SearchSegment>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/search',
            query: {
                'query': query,
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
     * Get Documents
     * @param author
     * @param skip
     * @param limit
     * @returns any Successful Response
     * @throws ApiError
     */
    public allDocuments(
        author?: string,
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<(YoutubeDocument | BaseDocument)>> {
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

}
