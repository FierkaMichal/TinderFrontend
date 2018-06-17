import {Component, OnInit} from '@angular/core';
import {Match} from "../model/match";
import {MatchService} from "../match.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  public connectedActive = true;
  public likedActive = false;
  public receivedActive = false;
  public matchList: Match[];


  constructor(private matchService: MatchService, private router: Router) {
  }

  ngOnInit() {
    this.onClickConnected();
  }

  getAllMatch() {
    this.matchService.getAllMatches().subscribe(res => {
      this.matchList = res;
      this.matchList.sort((one, two) => {
        if(one.isFavourite && !two.isFavourite) return -1;
        if(!one.isFavourite && two.isFavourite) return 1;
        return 0;
      });
      console.log(res);
    });
  }
  getMatchesGiven() {
    this.matchService.getMatchesGiven().subscribe(res => {
      this.matchList = res;
      console.log(res);
    });
  }
  getMatchesReceived() {
    this.matchService.getMatchesReceived().subscribe(res => {
      this.matchList = res;
      console.log(res);
    });
  }

  giveFavourite(idMatch) {
    this.matchService.giveFavourite(idMatch).subscribe(res => {
      let match = this.matchList.find(i => i.idMatch == idMatch);
      if(match.isFavourite) {
        match.isFavourite = false;
      } else {
        match.isFavourite = true;
      }
      this.matchList.sort((one, two) => {
        if(one.isFavourite && !two.isFavourite) return -1;
        if(!one.isFavourite && two.isFavourite) return 1;
        return 0;
      });
    });
  }

  deleteMatch(idMatch) {
    this.matchService.deleteMatch(idMatch).subscribe(res => {
      let match = this.matchList.find(i => i.idMatch == idMatch);
      var index = this.matchList.indexOf(match, 0);
      if (index > -1) {
        this.matchList.splice(index, 1);
      }
    });
  }

  giveLike(idUser) {
    this.matchService.giveLike(idUser).subscribe(res => {
      let match = this.matchList.find(i => i.idUser == idUser);
      var index = this.matchList.indexOf(match, 0);
      if (index > -1) {
        this.matchList.splice(index, 1);
      }
    });
  }


  onClickReceived() {
    this.connectedActive = false;
    this.likedActive = false;
    this.receivedActive = true;
    this.getMatchesReceived();
  }

  onClickLiked() {
    this.connectedActive = false;
    this.likedActive = true;
    this.receivedActive = false;
    this.getMatchesGiven();
  }

  onClickConnected() {
    this.connectedActive = true;
    this.likedActive = false;
    this.receivedActive = false;
    this.getAllMatch();
  }

  goToProfile(idUser) {
    this.router.navigate(["/profile/" + idUser]);
  }

  goToChat(idMatch) {

  }
}
