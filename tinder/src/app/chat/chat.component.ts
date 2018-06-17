import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';
import {RestService} from "../rest.service";
import {CookieService} from "ngx-cookie-service";
import {ResponseMessage} from "../model/responseMessage";
import {Match} from "../model/match";
import {Router} from "@angular/router";
import {MatchService} from "../match.service";
import {PhotoService} from "../photo.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public message: string;
  public msgs;
  public chatList: Match[];
  public responseMessage: {chatID, message: ResponseMessage[]}[];
  public currentSeeMessage: ResponseMessage[];
  public idChat;
  public senderID;
  public tabIndex;
  private stompClient;

  constructor(private restService: RestService, private cookies: CookieService, private router: Router, private matchService: MatchService, private photoService: PhotoService) {
    this.responseMessage = new Array<{chatID, message}>();
    $(".messages").animate({ scrollTop: $(document).height() }, "fast");

    $("#profile-img").click(function() {
      $("#status-options").toggleClass("active");
    });

    $(".expand-button").click(function() {
      $("#profile").toggleClass("expanded");
      $("#contacts").toggleClass("expanded");
    });

    $("#status-options ul li").click(function() {
      $("#profile-img").removeClass();
      $("#status-online").removeClass("active");
      $("#status-away").removeClass("active");
      $("#status-busy").removeClass("active");
      $("#status-offline").removeClass("active");
      $(this).addClass("active");

      if($("#status-online").hasClass("active")) {
        $("#profile-img").addClass("online");
      } else if ($("#status-away").hasClass("active")) {
        $("#profile-img").addClass("away");
      } else if ($("#status-busy").hasClass("active")) {
        $("#profile-img").addClass("busy");
      } else if ($("#status-offline").hasClass("active")) {
        $("#profile-img").addClass("offline");
      } else {
        $("#profile-img").removeClass();
      };

      $("#status-options").removeClass("active");
    });
    $(window).on('keydown', function(e) {
      if (e.which == 13) {
        this.onSendClick();
        return false;
      }
    });

  }

  ngOnInit() {
    this.connectToWebSocket();
    this.getAllMatch();
  }

  goToProfile() {
    this.router.navigate(["/profile/" + this.chatList[this.tabIndex].idUser]);
  }

  getAllMatch() {
    this.matchService.getAllMatches().subscribe(res => {
      this.chatList = res;
      this.chatList.sort((one, two) => {
        if(one.isFavourite && !two.isFavourite) return -1;
        if(!one.isFavourite && two.isFavourite) return 1;
        return 0;
      });
      console.log(res);
    });
  }

  onSendClick() {
    const param = JSON.stringify({token: this.cookies.get("token"), message: this.message});
    this.message = "";
    this.stompClient.send("/app/sendMessage/" + this.idChat, {}, param);
  }

  connectToWebSocket() {
    let ws = new SockJS(this.restService.host + "/webSocket/connect");
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat/getMessage", (message) => {
        let res = JSON.parse(message.body);
        console.log("resp" + message.body);
        let chat = that.responseMessage.find(i => i.chatID == res.idMatch);
        console.log(chat);
        if(chat == undefined || chat == null ){
          that.getAllMessage(res.idMatch, true);
        } else {
          chat = that.responseMessage.find(i => i.chatID == res.idMatch);
          chat.message.push(res);
        }
        let match = that.chatList.find(i => i.idMatch == res.idMatch);
        this.msgs = [];
        this.msgs.push({severity: 'success', summary: 'Nowa wiadomość', detail: 'Nowa wiadomość od ' + match.name + ' ' + match.surname});
        console.log(chat);
      });
    });
  }

  getPhoto(idPhoto): string {
    return this.photoService.getPhoto(idPhoto);
  }

  changeChat(idMatch: number, i: number) {
    this.idChat = idMatch;
    this.tabIndex = i;
    this.senderID = this.chatList[i].idUser;
    let chat = this.responseMessage.find(i => i.chatID == idMatch);
    if (chat == undefined || chat == null) {
      this.getAllMessage(idMatch, true);
    } else {
      chat = this.responseMessage.find(i => i.chatID == idMatch);
      this.currentSeeMessage = chat.message;
    }
  }

  getAllMessage(idChat, change) {
    this.restService.http.get<ResponseMessage[]>(this.restService.host + "/rest/chat/getAllMessage?idChat=" + idChat).subscribe(res => {
      this.responseMessage.push({chatID: idChat, message: res});
      console.log(this.responseMessage);
      if(change) {
        let chat = this.responseMessage.find(i => i.chatID == idChat);
        this.currentSeeMessage = chat.message;
        // let match = this.chatList.find(i => i.idMatch == idChat);
        // this.msgs = [];
        // this.msgs.push({severity: 'success', summary: 'Nowa wiadomość', detail: 'Nowa wiadomość od ' + match.name + ' ' + match.surname});
      }
    });
  }
}
