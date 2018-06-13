import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import {FormsModule} from "@angular/forms";
import { NavbarComponent } from './navbar/navbar.component';
import { ConnectionsComponent } from './connections/connections.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {FileUploadModule} from 'primeng/fileupload';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {PhotoService} from "./photo.service";
import {UserService} from "./user.service";
import {RestService} from "./rest.service";
import { CookieService } from 'ngx-cookie-service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {AccountService} from "./account.service";
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SearchComponent,
    NavbarComponent,
    ConnectionsComponent,
    EditProfileComponent,
    RegisterComponent,
    LoginComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CalendarModule,
    FileUploadModule,
    NgbModule.forRoot()
  ],
  providers: [PhotoService, UserService, RestService, CookieService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
