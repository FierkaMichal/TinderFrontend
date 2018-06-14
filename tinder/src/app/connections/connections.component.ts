import {Component, OnInit} from '@angular/core';
import {User} from "../model/user";

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  public connectedActive = true;
  public likedActive = false;
  public receivedActive = false;

  public userArray;



  constructor() {
    this.userArray = [{name: 'dsadas', surname: 'dada'},
      {name: 'dsadas', surname: 'dada'},
      {name: 'dsadas', surname: 'dada'},
      {name: 'dsadas', surname: 'dada'}]
  }

  ngOnInit() {
  }

  onClickReceived() {
    this.connectedActive = false;
    this.likedActive = false;
    this.receivedActive = true;
  }

  onClickLiked() {
    this.connectedActive = false;
    this.likedActive = true;
    this.receivedActive = false;
  }

  onClickConnected() {
    this.connectedActive = true;
    this.likedActive = false;
    this.receivedActive = false;
  }
}
