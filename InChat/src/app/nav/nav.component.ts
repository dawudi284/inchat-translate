import { Component, OnInit } from '@angular/core';
import { ChatsComponent } from '../chats/chats.component';
import { SettingsComponent } from '../settings/settings.component';
import { FriendsListComponent } from '../friends-list/friends-list.component';
import { HomeComponent } from '../home/home.component';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public chatComponent: ChatsComponent, public friends: FriendsListComponent) { }

  ngOnInit() {
  }

}
