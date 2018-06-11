import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private restService: RestService) { }

  giveLike(idUserTo) {
    let params = new HttpParams();
    params = params.set("idUserTo", idUserTo);
    return this.restService.doPost("/rest/match/giveLike", params);
  }

  giveFavourite(idMatch) {
    let params = new HttpParams();
    params = params.set("idMatch", idMatch);
    return this.restService.doPost("/rest/match/giveFavourite", params);
  }

  getAllMatches() {
    return this.restService.doGet("rest/match/getAllMatches", {});
  }

  getMatchesGiven() {
    return this.restService.doGet("rest/match/getMatchesGiven", {});
  }

  getMatchesReceived() {
    return this.restService.doGet("rest/match/getMatchesReceived", {});
  }

  deleteMatch(idMatch) {
    let params = new HttpParams();
    params = params.set("idMatch", idMatch);
    return this.restService.doPost("rest/match/deleteMatch", params);
  }

  getNext(idCurrent, searchDistance) {
    let params = new HttpParams();
    params = params.set("idCurrent", idCurrent);
    params = params.set("searchDistance", searchDistance);
    return this.restService.doGet("rest/match/getMatchesReceived", params);
  }
}
