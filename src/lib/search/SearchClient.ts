/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';

import { DocumentsService } from './services/DocumentsService';
import { ProfileService } from './services/ProfileService';
import { SearchService } from './services/SearchService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class SearchClient {

  public readonly documents: DocumentsService;
  public readonly profile: ProfileService;
  public readonly search: SearchService;

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

    this.documents = new DocumentsService(this.request);
    this.profile = new ProfileService(this.request);
    this.search = new SearchService(this.request);
  }
}

