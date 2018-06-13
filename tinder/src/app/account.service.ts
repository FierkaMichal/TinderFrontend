import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Response} from "./model/response";
import {Match} from "./model/match";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private restService: RestService, private cookieService: CookieService) {
  }

  checkIfLoginExist(login) {
    return this.restService.doGet("/rest/checkIfLoginExist?login=" + login);
  }

  logout(): Observable<Response> {
    let token = this.cookieService.get("token");
    return this.restService.http.post<Response>(this.restService.host + "/rest/match/getMatchesGiven", {
      headers: this.restService.getHeader(token)
    });
  }

  register(login, password) {
    const params = JSON.stringify({
      login: login,
      password: password
    });
    return this.restService.doPost("/rest/register", params);
  }

  loginFunction(login, password): Observable<Response> {
    const params = JSON.stringify({login: login, password: password});
    return this.restService.doLoginPost("/rest/login", params);
  }
}
