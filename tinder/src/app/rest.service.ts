import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  public host = "http://localhost:8081";

  constructor(public http: HttpClient) { }

  // doPostNoParams(path): Observable<string> {
  //   return this.http.post<string>(this.host + path, {});
  // }

  doPost(path, params) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    return this.http.post(this.host + path, params, {headers: headers});
  }

  // doGetNoParams(path): Observable<string> {
  //   return this.http.get<string>(this.host + path, {});
  // }

  doGet(path, params) {
    return this.http.get(this.host + path, params);
  }

  doLoginPost(path, params) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa("my-trusted-client:secret"));
    //headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers = headers.append("Access-Control-Allow-Origin", "*");
    console.log(headers);
    console.log(params);
    return this.http.post(this.host + path, params, {headers: headers});
  }
}
