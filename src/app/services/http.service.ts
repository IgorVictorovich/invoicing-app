import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private http: Http) {
  }

  public get(url: string) {
    return this.http.get(url);
  }

  public post(url: string, payload: any, requestOptions?: RequestOptions) {
    if (!requestOptions) {
      requestOptions = new RequestOptions();
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      requestOptions.headers = headers;
    }
    return this.http.post(url, payload, requestOptions);
  }
}
