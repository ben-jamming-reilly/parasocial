/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';

import { ClusterService } from './services/ClusterService';
import { ProfileService } from './services/ProfileService';
import { SearchService } from './services/SearchService';
import { SimilarService } from './services/SimilarService';
import { VideosService } from './services/VideosService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class VideoQuery {

  public readonly cluster: ClusterService;
  public readonly profile: ProfileService;
  public readonly search: SearchService;
  public readonly similar: SimilarService;
  public readonly videos: VideosService;

  public readonly request: BaseHttpRequest;

  constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? '',
      VERSION: config?.VERSION ?? '0.1.0',
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? 'include',
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    });

    this.cluster = new ClusterService(this.request);
    this.profile = new ProfileService(this.request);
    this.search = new SearchService(this.request);
    this.similar = new SimilarService(this.request);
    this.videos = new VideosService(this.request);
  }
}

