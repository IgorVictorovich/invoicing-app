import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';

@Injectable()
export class JsonpService {

  constructor(private jsonp: Jsonp) {
  }

  public get(url: string) {
    return this.jsonp.get(url);
  }

}
