import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {PhotoService} from "../photo.service";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public user: User;
  images: Array<string>;

  constructor(private http: HttpClient, private photoService: PhotoService, private acc: AccountService) { this.user = new User();
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
    this.user.birthday = new Date(1990, 11, 24);}

  ngOnInit() {
    this.http.get('https://picsum.photos/list')
      .pipe(map((images: Array<{ id: number }>) => this._randomImageUrls(images)))
      .subscribe(images => this.images = images);
  }
  private _randomImageUrls(images: Array<{ id: number }>): Array<string> {
    return [1, 2, 3].map(() => {
      const randomId = images[Math.floor(Math.random() * images.length)].id;
      return `https://picsum.photos/900/500?image=${randomId}`;
    });
  }

  changeAvatar(event) {
    for(let file of event.files) {
      this.photoService.changeAvatar(file.objectURL.changingThisBreaksApplicationSecurity).subscribe(res => {
        console.log(res)
      },
        err => {
        console.log(err)
        });
    }
  }

  addPhoto(event) {
    for(let file of event.files) {
      this.photoService.addPhoto(file).subscribe(res => {
          console.log(res)
        },
        err => {
          console.log(err)
        });
    }
  }

  deletePhoto(idPhoto) {
    this.photoService.deletePhoto(idPhoto).subscribe(res => {
        console.log(res)
      },
      err => {
        console.log(err)
      });
  }

  login() {
    this.acc.loginFunction('123', 'aaa').subscribe(res => {
        console.log(res)
      },
      err => {
        console.log(err)
      });
  }

  getPhoto(id) {
    return this.photoService.getPhoto(id);
  }
}
