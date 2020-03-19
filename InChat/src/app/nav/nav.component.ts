import { Component, OnInit } from '@angular/core';
import { ChatsComponent } from '../chats/chats.component';
import { SettingsComponent } from '../settings/settings.component';
import { FriendsListComponent } from '../friends-list/friends-list.component';
import { HomeComponent } from '../home/home.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { SettingsService } from '../services/settings.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss', '../sign-in/sign-in.component.scss']
})
export class NavComponent implements OnInit {
  loggedIn = false;
  currentUser: any;
  userRef = this.db.collection('users');
  user: any;
  showAlert = false;


  constructor(
    private afAuth: AuthService,
    private userService: UserService,
    private db: AngularFirestore,
    private settings: SettingsService) { }

  ngOnInit() {
    this.afAuth.Auth.auth.onAuthStateChanged(async () => {
      let add;
      if (this.afAuth.Auth.auth.currentUser === null) {
        this.loggedIn = false;
        console.log('No user');
        return;
      } else {
        this.loggedIn = true;
        this.currentUser = this.afAuth.Auth.auth.currentUser;
        add = await this.userService.doesUserExist(this.currentUser.uid);
      }
      if (add) {
        console.log('NOT added');
      } else if (!add) {
        console.log('Added');
        this.userService.createUser(this.currentUser.uid);
      }
    });
  }

  async deleteWrapper() {
    const uid = this.afAuth.Auth.auth.currentUser.uid;
    if (this.loggedIn === true) {
      this.afAuth.signOut(true);
      console.log('Sign Out');
      console.log('B4 delete');
      await this.userService.deleteUser(uid).then(() => {
        console.log('deleted');
      });

      console.log('After');
    }
  }

  async editWrapper(uName: string){
    await this.userService.editUsername(uName);
    console.log('Success!');
  }

}
