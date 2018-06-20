import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {UserService} from "../user.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  public users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUser().subscribe(res => {
      this.users = res;
    })
  }

  deleteUser(userID: number) {
    this.userService.deleteUser(userID).subscribe(res => {
      console.log(res);
      let user = this.users.find(u => u.idUser == userID);
      let index = this.users.indexOf(user);
      this.users.splice(index, 1);
    });
  }

}
