import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { auth } from 'firebase/app';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loggedIn = false;
  currentUser: any;
  userRef = this.db.collection('users');
  user: any;
  constructor(
    private afAuth: AuthService,
    private messageService: MessageService,
    private userService: UserService,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.afAuth.Auth.auth.onAuthStateChanged(() => {
      if (this.afAuth.Auth.auth.currentUser === null) {
        this.loggedIn = false;
        console.log('No user');
        return;
      } else {
        this.loggedIn = true;
        this.currentUser = this.afAuth.Auth.auth.currentUser;
      }
    });
  }

  deleteWrapper(inp: string) {
    if (this.loggedIn === true) {
      console.log('LoggedIn is true');
      this.userService.deleteUser(inp);
    }
  }
}
