/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchResult } from '../models/SearchResult';
import type { YoutubeVideo } from '../models/YoutubeVideo';

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
     * @returns SearchResult Successful Response
     * @throws ApiError
     */
    public documentSegmentsByQuery(
        query: string,
        author?: string,
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<SearchResult>> {
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
     * @returns YoutubeVideo Successful Response
     * @throws ApiError
     */
    public allDocuments(
        author?: string,
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<YoutubeVideo>> {
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
