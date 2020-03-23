import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { auth } from 'firebase/app';
import { FriendsService } from '../services/friends.service';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {

  constructor(private afAuth: AuthService, private  friendsService: FriendsService) { }

    friends;
    uid = this.afAuth.Auth.auth.currentUser.uid;

  async ngOnInit() {
    var uid = this.afAuth.Auth.auth.currentUser.uid

    //asynchronus friends list because function returns promise
    this.friends = await this.friendsService.listFriends(uid);
  }

}
