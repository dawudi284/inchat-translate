import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AuthService } from '../services/auth.service';
import { auth } from 'firebase/app';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  constructor(private chats: ChatService, private afAuth: AuthService, public messageService: MessageService, private userService: UserService) { }

  ngOnInit() {
    this.afAuth.Auth.auth.onAuthStateChanged(() => {
      if (this.afAuth.Auth.auth.currentUser === null) {
        console.log('No chats to display');
        return;
      } else {
        console.log(this.afAuth.Auth.auth.currentUser.uid);
        return;
      }
    });
  }
}
