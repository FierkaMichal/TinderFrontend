import {Component, OnInit} from '@angular/core';
import {User} from "../model/user";
import {PhotoService} from "../photo.service";
import {UserService} from "../user.service";
import * as $ from 'jquery';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public user: User;
  public msgs;
  images: Array<string>;

  constructor(private userService: UserService, private photoService: PhotoService) {

  }

  ngOnInit() {
    this.getLoggedUser();
  }

  changeAvatar(event) {
    for (let file of event.files) {
      console.log(file);
      this.photoService.changeAvatar(file).subscribe(res => {
          this.msgs = [];
          this.msgs.push({severity: 'success', summary: 'Sukces', detail: 'Zmieniono avatar'});
          console.log(res)
        },
        err => {
          console.log(err)
        });
    }
    document.getElementById("inputAvatar").setAttribute("files", null);
  }

  addPhoto(event) {
    for (let file of event.files) {
      this.photoService.addPhoto(file).subscribe(res => {
          this.user.photos.push(res);
          this.msgs = [];
          this.msgs.push({severity: 'success', summary: 'Sukces', detail: 'Dodano zdjęcie'});
          console.log(res);
        },
        err => {
          console.log(err)
        });
    }
  }

  deletePhoto(idPhoto) {
    this.photoService.deletePhoto(idPhoto).subscribe(res => {
        console.log(res)
        let index = this.user.photos.indexOf(idPhoto);
        this.user.photos.splice(index, 1);
      },
      err => {
        console.log(err)
      });
  }

  getPhoto(id) {
    return this.photoService.getPhoto(id);
  }

  getLoggedUser() {
    this.userService.getCurrentUser().subscribe(res => {
      this.user = res;
      this.user.birthday = new Date(this.user.birthday);
    });
  }

  saveChanges() {
    this.userService.updateUser(this.user).subscribe(res => {
      this.user = res;
      this.user.birthday = new Date(this.user.birthday);
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: 'Sukces', detail: 'Zaktualizowano dane'});
    }, err => {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Błąd', detail: 'Coś sie zepsuło'});
    });
  }
}
