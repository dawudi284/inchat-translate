import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { auth } from 'firebase/app';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { UtilsService } from '../services/utils.service';

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
  userIds: string[] = [];
  constructor(
    private afAuth: AuthService,
    private messageService: MessageService,
    private userService: UserService,
    private db: AngularFirestore,
    private utils: UtilsService) { }

  ngOnInit() {
  }

}
