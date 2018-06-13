import {Component, OnInit} from '@angular/core';
import {AccountService} from "../account.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public login;
  public password;
  public loginExist;

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
    this.loginExist = false;
    this.login = "";
  }

  onRegisterClick() {
    this.accountService.checkIfLoginExist(this.login).subscribe(res => {
      this.loginExist = res;
      console.log(res)
      if(!res) {
        this.accountService.register(this.login, this.password).subscribe(res => {
            console.log(res)
            this.router.navigate(['/login']);
          },
          err => {
            console.log(err)
          });
      }
    });
  }
}
