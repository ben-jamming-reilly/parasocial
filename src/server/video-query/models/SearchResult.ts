/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { YoutubeVideo } from './YoutubeVideo';

export type SearchResult = {
  text: string;
  score: number;
  start_ms: number;
  end_ms: number;
  video: YoutubeVideo;
};

