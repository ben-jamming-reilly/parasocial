/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseDocument } from './BaseDocument';
import type { YoutubeVideo } from './YoutubeVideo';

export type SearchResult = {
    text: string;
    score: number;
    start_ms: number;
    end_ms: number;
    document: (YoutubeVideo | BaseDocument);
};

