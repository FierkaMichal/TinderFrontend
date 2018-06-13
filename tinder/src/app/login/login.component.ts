import {Component, OnInit} from '@angular/core';
import {AccountService} from "../account.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login;
  public password;
  public wrongCredentials;

  constructor(private accountService: AccountService, private router: Router, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.wrongCredentials = false;
  }

  onLoginClick() {
    this.accountService.loginFunction(this.login, this.password).subscribe(res => {
        console.log(res);
        if (res.response) {
          this.cookieService.set("token", res.response);
          this.router.navigate(["/profile"]);
        }
      },
      err => {
        console.log(err);
        if (err.status === 401) {
          this.wrongCredentials = true;
        }
      });
  }
}
