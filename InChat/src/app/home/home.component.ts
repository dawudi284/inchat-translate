import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loggedIn = false;
  currentUser: auth.UserCredential;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.isLoggedIn();
    if(this.currentUser){
      console.log(this.currentUser);
    }
  }

  isLoggedIn() {
    console.log(localStorage.getItem('loggedIn'));
    if (localStorage.getItem('loggedIn') === 'true') {
      this.loggedIn = true;
    }
  }
  checkUser() {
    console.log(this.auth.currentUser);
  }

}
