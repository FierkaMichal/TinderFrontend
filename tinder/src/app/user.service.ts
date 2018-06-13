import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {CookieService} from "ngx-cookie-service";
import {HttpHeaders} from "@angular/common/http";
import {User} from "./model/user";
import {Observable} from "rxjs/internal/Observable";
import {Response} from "./model/response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private restService: RestService, private cookieService: CookieService) { }

  getCurrentUser(): Observable<User> {
    let token = this.cookieService.get("token");
    return this.restService.http.get<User>(this.restService.host+"/rest/user/getCurrentUser", {
      headers: this.restService.getHeader(token)
    });
  }

  getUser(idUser): Observable<User> {
    let token = this.cookieService.get("token");
    return this.restService.http.get<User>(this.restService.host+"/rest/user/getUser?idUser=" + idUser, {
      headers: this.restService.getHeader(token)
    });
  }

  updateUser(user: User): Observable<User> {
    let token = this.cookieService.get("token");
    return this.restService.http.post<User>(this.restService.host+"/rest/user/updateUser", {user}, {
      headers: this.restService.getHeader(token)
    });
  }

  updateLocalization(lon, lat): Observable<Response> {
    let token = this.cookieService.get("token");
    return this.restService.http.post<Response>(this.restService.host+"/rest/user/updateLocalization?lon=" + lon +"&lat=" + lat,  {
      headers: this.restService.getHeader(token)
    });
  }
}
