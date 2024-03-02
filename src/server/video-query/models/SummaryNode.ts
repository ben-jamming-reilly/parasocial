/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SummaryNode = {
  summary: string;
  video_url: string;
  start_ms: number;
  end_ms: number;
  children: Array<SummaryNode>;
};

