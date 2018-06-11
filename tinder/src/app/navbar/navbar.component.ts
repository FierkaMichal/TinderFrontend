import { Component, OnInit, DoCheck } from '@angular/core';
import {Router} from "@angular/router";
import {PhotoService} from "../photo.service";
import {CookieService} from "ngx-cookie-service";
import {ObservableLike} from "rxjs/internal/types";
import {Observable} from "rxjs/internal/Observable";

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
    {name: 'Wyloguj', path: '/logout'}

  ];

  public userNotLoggedNavButtons = [
    {name: 'Załóż konto', path: '/register'},
    {name: 'Zaloguj się', path: '/login'}
  ];

  public isUserLogged;

  constructor(private router: Router,  private cookieService: CookieService ) { }

  ngOnInit() {
    this.isUserLogged = this.cookieService.check('token');
  }

  ngDoCheck() {
    this.isUserLogged = this.cookieService.check('token');
  }

  redirectTo(path) {
    if(path == '/login') {
      this.cookieService.set('token', "dssad");
    }
    if(path == '/logout') {
      this.cookieService.delete('token');
    }
    this.router.navigate(["" +  path]);
  }
}
