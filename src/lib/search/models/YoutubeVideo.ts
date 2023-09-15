/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type YoutubeVideo = {
  id: string;
  url: string;
  author: string;
  channel_id: string;
  channel_url: string;
  description: (string | null);
  keywords: Array<string>;
  length: number;
  publish_date: string;
  rating: (number | null);
  thumbnail_url: string;
  title: string;
  views: number;
};

