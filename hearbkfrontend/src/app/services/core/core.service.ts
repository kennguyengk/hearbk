import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class CoreService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  get(url,options):Observable<any> {
    return this.httpClient.get(url,options);
  }

  post(url,body,options):Observable<any> {
   return this.httpClient.post(url, body, options);
  }

  put(url,body,options):Observable<any> {
    return this.httpClient.put(url,body,options);
  }

  delete(url,options):Observable<any> {
    return this.httpClient.delete(url,options);
  }
}
