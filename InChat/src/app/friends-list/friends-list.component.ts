import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { auth } from 'firebase/app';
import { MessageService } from '../services/message.service';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {

  constructor(private afAuth: AuthService, private messageService: MessageService, private  friendsService: FriendsService) { }

  ngOnInit() {
    
  }

}
