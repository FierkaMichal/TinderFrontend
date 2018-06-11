import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private restService: RestService) { }

  checkIfLoginExist(login) {
    let params = new HttpParams();
    params = params.set("login", login);
    return this.restService.doGet("/rest/checkIfLoginExist", params);
  }

  logout() {
    return this.restService.doPost("/rest/logout", {});
  }

  register(login, password) {
    const params = JSON.stringify({
      login: login,
      password: password
    });
    return this.restService.doPost("/rest/register", params);
  }

  loginFunction(login, password): Observable<Object> {
    let params = new HttpParams();
    params = params.set("username", login);
    params = params.set("password", password);
    params = params.set("grant_type", 'password');
    // const params = JSON.stringify({grant_type: password, username: login, password: password});
    return this.restService.doLoginPost("/oauth/token", params);
  }
}
