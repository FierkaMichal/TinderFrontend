import { Component, OnInit } from '@angular/core';
import {AccountService} from "../account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login;
  public password;

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  onLoginClick() {
    this.accountService.loginFunction(this.login, this.password).subscribe(res => {
      console.log(res);
    },
      err => {
      console.log(err);
      });
  }
}
