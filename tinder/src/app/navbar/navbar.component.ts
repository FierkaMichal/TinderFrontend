import { Component, OnInit, DoCheck } from '@angular/core';
import {Router} from "@angular/router";
import {PhotoService} from "../photo.service";
import {CookieService} from "ngx-cookie-service";
import {ObservableLike} from "rxjs/internal/types";
import {Observable} from "rxjs/internal/Observable";
import {AccountService} from "../account.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userLoggedNavButtons = [
    {name: 'Profil', path: '/profile'},
    {name: 'Szukaj', path: '/matcher'},
    {name: 'Połączenia', path: '/connections'},
    {name: 'Chat', path: '/chat'},
    {name: 'Wyloguj', path: '/login'}

  ];

  public userNotLoggedNavButtons = [
    {name: 'Załóż konto', path: '/register'},
    {name: 'Zaloguj się', path: '/login'}
  ];

  public isUserLogged;

  constructor(private router: Router, private cookieService: CookieService, private userService: UserService) { }

  ngOnInit() {
    this.isUserLogged = this.cookieService.check('token');
    if(this.isUserLogged == true){
      this.userService.getCurrentUser().subscribe(res => {
        if(res.isAdmin == true) {
          this.userLoggedNavButtons.splice(4, 0, {name: 'Panel administratora', path: '/adminPanel'});
        }
      })
    }
  }

  ngDoCheck() {
    this.isUserLogged = this.cookieService.check('token');
  }

  redirectTo(path) {
    if(path == '/login') {
      this.cookieService.delete('token');
    }
    this.router.navigate(["" +  path]);
  }
}
