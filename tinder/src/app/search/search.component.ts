import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {Router} from "@angular/router";
import {MatchService} from "../match.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searchDistance;
  public userActive;
  public user: User;
  public msgs;

  constructor(private matchService: MatchService, private router: Router, private userService: UserService) {

  }

  ngOnInit() {
    this.userActive = false;
    if(this.user == undefined) {
      this.searchDistance = 50;
      this.getNextUser(0);
    }
    this.isUserActive();
  }

  getNextUser(idUser) {
    this.matchService.getNext(idUser, this.searchDistance).subscribe(res => {
      this.user = res;
      this.user.birthday = new Date(this.user.birthday);
      console.log(res);
    });
  }

  giveLike() {
    this.matchService.giveLike(this.user.idUser).subscribe(res => {
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: 'Sukces', detail: 'Polubiono ' + this.user.name});
      this.getNextUser(this.user.idUser);
    });
  }

  goToProfile() {
    this.router.navigate(["/profile/" + this.user.idUser]);
  }

  isUserActive() {
    this.userService.isUserActive().subscribe(res => {
      this.userActive = res;
      console.log(res);
    });
  }


  getAge(): number {
    var ageDifMs = Date.now() - this.user.birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}
