import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searchDistance;
  public user: User

  constructor() {
    this.searchDistance = 50;
    this.user = new User();
    this.user.name = "Michal";
    this.user.surname = "gfh";
    this.user.interests = [
      {name: "aaa", id: 1},
      {name: "aaa", id: 1},
      {name: "aaa", id: 1},
      {name: "aaa", id: 1},
      {name: "aaa", id: 1},
      {name: "aaa", id: 1}
    ]
    this.user.description = "dsasdasfsdffdsf" +
      "ffsdfsfds" +
      "fsasfds";
    this.user.sex = 'F';
    this.user.birthday = new Date();
    this.user.avatar = "https://vignette.wikia.nocookie.net/kononowicz/images/3/3f/Konon.png/revision/latest?cb=20180429133048&path-prefix=pl";
  }

  ngOnInit() {
  }

  getAge(): number {
    var ageDifMs = Date.now() - this.user.birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}
