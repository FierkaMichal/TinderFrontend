import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {HttpParams} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Match} from "./model/match";
import {Observable} from "rxjs/internal/Observable";
import {Response} from "./model/response";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private restService: RestService, private cookieService: CookieService) {
  }

  giveLike(idUserTo): Observable<Match> {
    let token = this.cookieService.get("token");
    return this.restService.http.post<Match>(this.restService.host + "/rest/match/giveLike?idUserTo=" + idUserTo, {
      headers: this.restService.getHeader(token)
    });
  }

  giveFavourite(idMatch): Observable<Match> {
    let token = this.cookieService.get("token");
    return this.restService.http.post<Match>(this.restService.host + "/rest/match/giveFavourite?idMatch=" + idMatch, {
      headers: this.restService.getHeader(token)
    });
  }

  getAllMatches(): Observable<Match[]> {
    let token = this.cookieService.get("token");
    return this.restService.http.get<Match[]>(this.restService.host + "/rest/match/getAllMatches", {
      headers: this.restService.getHeader(token)
    });
  }

  getMatchesGiven(): Observable<Match[]> {
    let token = this.cookieService.get("token");
    return this.restService.http.get<Match[]>(this.restService.host + "/rest/match/getMatchesGiven", {
      headers: this.restService.getHeader(token)
    });
  }


  getMatchesReceived(): Observable<Match[]> {
    let token = this.cookieService.get("token");
    return this.restService.http.get<Match[]>(this.restService.host + "/rest/match/getMatchesReceived", {
      headers: this.restService.getHeader(token)
    });
  }

  deleteMatch(idMatch): Observable<Response> {
    let token = this.cookieService.get("token");
    return this.restService.http.post<Response>(this.restService.host + "/rest/match/deleteMatch?idMatch=" + idMatch, {
      headers: this.restService.getHeader(token)
    });
  }

  getNext(idCurrent, searchDistance): Observable<Match> {
    let token = this.cookieService.get("token");
    return this.restService.http.get<Match>(this.restService.host + "/rest/match/getNext?idCurrent=" + idCurrent + "&searchDistance=" + searchDistance, {
      headers: this.restService.getHeader(token)
    });
  }
}
