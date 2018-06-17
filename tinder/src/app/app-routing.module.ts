import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {SearchComponent} from "./search/search.component";
import {ConnectionsComponent} from "./connections/connections.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {ChatComponent} from "./chat/chat.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'matcher', component: SearchComponent},
  {path: 'connections', component: ConnectionsComponent},
  {path: 'adminPanel', component: AdminPanelComponent},
  {path: 'chat', component: ChatComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ProfileComponent, ChatComponent, SearchComponent, ConnectionsComponent, RegisterComponent, LoginComponent, AdminPanelComponent]
