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

  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
  }

  onRegisterClick() {
    this.accountService.register(this.login, this.password).subscribe(res => {
        console.log(res)
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err)
      });
  }

}
