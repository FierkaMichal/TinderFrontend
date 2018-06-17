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
  public allInterest: {idInterest, name}[]
  images: Array<string>;

  constructor(private userService: UserService, private photoService: PhotoService) {

  }

  ngOnInit() {
    this.getLoggedUser();
    this.getAllInterest();
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

  getAllInterest() {
    this.userService.getAllInterest().subscribe(res =>{
      this.allInterest = res;
    });
  }

  userInterest(idInterest): boolean {
    let inte = this.user.interests.find(a => a.idInterest == idInterest);
    if(inte == undefined || inte == null)
      return false;
    return true;
  }

  interestCheck(interest: {idInterest, name}) {
    let inte = this.user.interests.find(a => a.idInterest == interest.idInterest);
    if(inte == undefined || inte == null) {
      this.user.interests.push(interest);
    }
    else {
      let index = this.user.interests.indexOf(inte);
      this.user.interests.splice(index, 1);
    }
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
