import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { auth } from 'firebase/app';
import { UserService } from '../services/user.service';
import { FriendsService } from '../services/friends.service';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {

  constructor(private afAuth: AuthService, private  friendsService: FriendsService, private userService: UserService) { }

    friendsUID;
    //friendsUname;
    uid = this.afAuth.Auth.auth.currentUser.uid;
    uName;

  async ngOnInit() {
    //var uid = this.afAuth.Auth.auth.currentUser.uid
    this.uName = await this.userService.uIDToUname(this.uid);

    //asynchronus friends list because function returns promise
    this.friendsUID = await this.friendsService.listFriends(this.uid);

    /*
    this.friendsUname = this.friendsUID.map(uID =>
      await this.userService.uIDToUname(uID)
    );
    */

  }
}
