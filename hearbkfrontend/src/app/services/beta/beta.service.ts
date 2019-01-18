import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpHeaders } from "@angular/common/http";

import { CoreService } from "./../core/core.service";
import { URLS } from "./../../utills/api.url.constant";
import { environment } from "./../../../environments/environment";

@Injectable()
export class BetaService {

  baseUrl: string = environment.baseHref.base + environment.baseHref.users;
  headersJson:any;
  headersUrl:any;
  token:any;

  constructor(private coreServ: CoreService) {
    this.headersJson = new HttpHeaders({'Content-Type': 'application/json'});
  }

  creatorSignup(body): Observable<any>  {
    let url = this.baseUrl + URLS.SIGNUP_BETA_CREATER;
    return this.coreServ.post(url,body,{});
  }

  loverSignup(body): Observable<any>  {
    let url = this.baseUrl + URLS.SIGNUP_BETA_LOVER;
    return this.coreServ.post(url,body,{});
  }

  subscriberBeta(body): Observable<any> {
    let url = this.baseUrl + URLS.SUBSCRIBE_BETA;
    return this.coreServ.post(url,body,{ headers: this.headersJson });
  }

  contactUs(body): Observable<any> {
    let url = this.baseUrl + URLS.CONTACT_US;
    return this.coreServ.post(url,body,{ headers: this.headersJson });
  }
}