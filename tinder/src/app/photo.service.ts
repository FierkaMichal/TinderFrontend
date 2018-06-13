import {Injectable} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {RestService} from "./rest.service";
import {User} from "./model/user";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private restService: RestService, private cookieService: CookieService) {
  }

  getPhoto(idPhoto) {
    return this.restService.host + "/rest/photo/getPhoto?idPhoto=" + idPhoto;
  }

  addPhoto(photo) {
    let token = this.cookieService.get("token");
    return this.restService.http.post<string>(this.restService.host + "/rest/photo/addPhoto", {photo}, {
      headers: this.restService.getHeader(token)
    });
  }

  changeAvatar(photo) {
    let token = this.cookieService.get("token");
    return this.restService.http.post<string>(this.restService.host + "/rest/photo/changeAvatar", {photo}, {
      headers: this.restService.getHeader(token)
    });
  }

  deletePhoto(idPhoto) {
    let token = this.cookieService.get("token");
    return this.restService.http.post<string>(this.restService.host + "/rest/photo/deletePhoto", {id: idPhoto}, {
      headers: this.restService.getHeader(token)
    });
  }
}
