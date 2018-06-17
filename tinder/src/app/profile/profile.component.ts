import {Component, OnInit} from '@angular/core';
import {User} from "../model/user";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user.service";
import {PhotoService} from "../photo.service";


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

  constructor(private photoService: PhotoService, private userService: UserService, private activatedRoute: ActivatedRoute) {
    this.user = new User();
  }

  ngOnInit() {
    if(this.activatedRoute.snapshot.paramMap.get('id') != null) {
      let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
      this.getOtherProfile(id);
      this.isLoggedUser = false;
    } else {
      this.getLoggedUser();
      this.isLoggedUser = true;
    }
  }

  getLoggedUser() {
    this.userService.getCurrentUser().subscribe(res => {
      this.user = res;
      this.userService.getGeolocation().subscribe(res => {
        this.userService.updateLocalization(res.location.lng, res.location.lat).subscribe(res => {
          console.log(res);
        });
        console.log(res);
      });
      console.log(this.user);
    });
  }


  onClickProfile() {
    this.isProfileActive = true;
    this.isPicturesActive = false;
    this.isEditorActive = false;

    if(this.activatedRoute.snapshot.paramMap.get('id') != null) {
      let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
      this.getOtherProfile(id);
      this.isLoggedUser = false;
    } else {
      this.getLoggedUser();
      this.isLoggedUser = true;
    }

  }


  onClickPictures() {
    this.isProfileActive = false;
    this.isPicturesActive = true;
    this.isEditorActive = false;

    if(this.activatedRoute.snapshot.paramMap.get('id') != null) {
      let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
      this.getOtherProfile(id);
      this.isLoggedUser = false;
    } else {
      this.getLoggedUser();
      this.isLoggedUser = true;
    }
  }

  onClickEditor() {
    this.isProfileActive = false;
    this.isPicturesActive = false;
    this.isEditorActive = true;
  }

  getOtherProfile(idUser) {
    this.userService.getUser(idUser).subscribe(res => {
      this.user = res;
    });
  }

  getAge(): number {
    var ageDifMs = Date.now() - new Date(this.user.birthday).getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getPhoto(idPhoto): string {
    return this.photoService.getPhoto(idPhoto);
  }
}
