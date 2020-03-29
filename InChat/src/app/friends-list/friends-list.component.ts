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

    //friendsUID;
    //friendsUname;
    uid = this.afAuth.Auth.auth.currentUser.uid;
    uName;
    

  async ngOnInit() {
    
    //this.uid = await this.userService.emailToUID("tug51985@temple.edu");
    //var uid = this.afAuth.Auth.auth.currentUser.uid
    //this.uName = await this.userService.uIDToUname(this.uid);
    //this.uName = this.userService.getCurrentUser().data().userDB.uName;

    //asynchronus friends list because function returns promise
    //this.friendsUID = await this.friendsService.listFriends(this.uid);
    //this.friendsUID = this.userService.getCurrentUser().data().userDB.friends;

  }
}
