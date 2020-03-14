import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { auth } from 'firebase/app';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loggedIn = false;
  currentUser: any;
  constructor(private afAuth: AuthService, private messageService: MessageService, private userService: UserService) { }

  ngOnInit() {
    this.afAuth.Auth.auth.onAuthStateChanged(() => {
      if (this.afAuth.Auth.auth.currentUser === null) {
        this.loggedIn = false;
        console.log('No user');
        return;
      } else {
        this.loggedIn = true;
        this.currentUser = this.afAuth.Auth.auth.currentUser;
        console.log(this.afAuth.Auth.auth.currentUser.uid);
        return;
      }
    });
    this.userService.getDocumentIds('users');
  }

  deleteWrapper(input: string){
    if (this.loggedIn === true) {
      console.log('LoggedIn is true');
      this.userService.deleteUser(input);
    }
  }
}
