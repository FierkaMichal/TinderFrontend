import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {CookieService} from "ngx-cookie-service";
import {HttpHeaders} from "@angular/common/http";
import {User} from "./model/user";
import {Observable} from "rxjs/internal/Observable";
import {Response} from "./model/response";
import {Location} from "./model/location";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: User;

  constructor(private restService: RestService, private cookieService: CookieService) { }

  getCurrentUserObject(): User {
    return this.currentUser;
  }

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
    // let params = user.toJson();
    return this.restService.http.post<User>(this.restService.host+"/rest/user/updateUser", JSON.stringify(user), {
      headers: this.restService.getHeader(token)
    });
  }

  updateLocalization(lon, lat): Observable<Response> {
    let token = this.cookieService.get("token");
    return this.restService.http.post<Response>(this.restService.host+"/rest/user/updateLocalization?lon=" + lon +"&lat=" + lat, {}, {
      headers: this.restService.getHeader(token)
    });
  }

  isUserActive(): Observable<boolean> {
    let token = this.cookieService.get("token");
    return this.restService.http.get<boolean>(this.restService.host + "/rest/user/userActive", {
      headers: this.restService.getHeader(token)
    });
  }

  updateInterest(params) {
    let token = this.cookieService.get("token");
    this.restService.http.post(this.restService.host + "/rest/interest/updateInterest", params, {
      headers: this.restService.getHeader(token)
    });
  }

  getAllInterest(): Observable<{idInterest, name}[]> {
    let token = this.cookieService.get("token");
    return this.restService.http.get<{idInterest, name}[]>(this.restService.host + "/rest/interest/getAllInterest", {
      headers: this.restService.getHeader(token)
    });
  }

  getGeolocation(): Observable<Location> {
    return this.restService.http.post<Location>('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCTymYxKGB4DeLuPJWDp8BpP8-iO2dhHsk', {});
  }

  getAllUser(): Observable<User[]> {
    let token = this.cookieService.get("token");
    return this.restService.http.get<User[]>(this.restService.host + '/rest/user/getAll', {
      headers: this.restService.getHeader(token)
    });
  }

  deleteUser(params): Observable<Object>{
    let token = this.cookieService.get("token");
    return this.restService.http.post<Object>(this.restService.host + "/rest/user/deleteUser?idUser=" + params, {}, {
      headers: this.restService.getHeader(token)
    });
  }
}
