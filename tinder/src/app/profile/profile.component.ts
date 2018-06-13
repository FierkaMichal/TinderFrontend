import {Component, OnInit} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {User} from "../model/user";
import {ActivatedRoute, Router} from "@angular/router";
import {CalendarModule} from 'primeng/calendar';
import {PhotoService} from "../photo.service";
import {UserService} from "../user.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public isProfileActive = true;
  public isPicturesActive = false;
  public isEditorActive = false;

  public isLoggedUser = false;

  public user: User;

  public date3: Date;
  images: Array<string>;

  constructor(private http: HttpClient, private userService: UserService, private activatedRoute: ActivatedRoute) {
    this.user = new User();
    this.user.name = "Paweł";
    this.user.surname = "Pizda";
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
    this.user.birthday = new Date(1990, 11, 24);
  }

  ngOnInit() {
    // this.http.get('https://picsum.photos/list')
    //   .pipe(map((images: Array<{ id: number }>) => this._randomImageUrls(images)))
    //   .subscribe(images => this.images = images);
    if(this.activatedRoute.snapshot.paramMap.get('id') != null) {
      let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
      this.isLoggedUser = false;
    } else {
      this.getLoggedUser();
      this.isLoggedUser = true;
    }
  }

  getLoggedUser() {
    this.userService.getCurrentUser().subscribe(res => {
      console.log(res);
    })
  }

  // private _randomImageUrls(images: Array<{ id: number }>): Array<string> {
  //   return [1, 2, 3].map(() => {
  //     const randomId = images[Math.floor(Math.random() * images.length)].id;
  //     return `https://picsum.photos/900/500?image=${randomId}`;
  //   });
  // }

  onClickProfile() {
    this.isProfileActive = true;
    this.isPicturesActive = false;
    this.isEditorActive = false;
  }


  onClickPictures() {
    this.isProfileActive = false;
    this.isPicturesActive = true;
    this.isEditorActive = false;
  }

  onClickEditor() {
    this.isProfileActive = false;
    this.isPicturesActive = false;
    this.isEditorActive = true;
  }

  getAge(): number {
    var ageDifMs = Date.now() - this.user.birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
