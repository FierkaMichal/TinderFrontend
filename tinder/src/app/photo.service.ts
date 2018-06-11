import { Injectable } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {RestService} from "./rest.service";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private restService: RestService) { }

  getPhoto(idPhoto) {
    return this.restService.host + "/rest/photo/getPhoto?idPhoto=" + idPhoto;
  }

  addPhoto(photo) {
    let params = new HttpParams();
    params = params.set("photo", photo);
    return this.restService.doPost("/rest/photo/addPhoto", params);
  }

  changeAvatar(photo) {
    let params = new HttpParams();
    params = params.set("avatar", photo);
    return this.restService.doPost("/rest/photo/changeAvatar", params);
  }

  deletePhoto(idPhoto) {
    const params = JSON.stringify({id: idPhoto});
    return this.restService.doPost("/rest/photo/deletePhoto", params);
  }
}
