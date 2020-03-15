import { Component, OnInit } from '@angular/core';
import { ChatsComponent } from '../chats/chats.component';
import { SettingsComponent } from '../settings/settings.component';
import { FriendsListComponent } from '../friends-list/friends-list.component';
import { HomeComponent } from '../home/home.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private afAuth: AuthService, private userService: UserService) { }
  currentUser: any;
  ngOnInit() {
    this.currentUser = this.afAuth.Auth.auth.currentUser;
  }

  delete() {
    const uid = this.afAuth.Auth.auth.currentUser.uid;
    this.afAuth.signOut(true);
    this.userService.deleteUser(uid);
  }

}
