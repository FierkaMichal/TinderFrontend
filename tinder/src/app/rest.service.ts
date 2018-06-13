import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {CookieService} from "ngx-cookie-service";
import {Response} from "./model/response";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  public host = "http://localhost:8081";

  constructor(public http: HttpClient, private cookies: CookieService) {
  }

  doPost(path, params) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return this.http.post(this.host + path, params, {headers: headers});
  }
  doGet(path) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Bearer " + this.cookies.get('token'));
    return this.http.get(this.host + path, {headers: headers});
  }

  doLoginPost(path, params): Observable<Response> {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return this.http.post<Response>(this.host + path, params,{headers: headers});
  }

  getHeader(token): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("access_token", token);
    return headers;
  }
}
