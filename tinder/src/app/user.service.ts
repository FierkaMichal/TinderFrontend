import { Injectable } from '@angular/core';
import {RestService} from "./rest.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private restService: RestService) { }


}
