import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser: auth.UserCredential;
  constructor(public afAuth: AngularFireAuth) { }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
        console.log('You have been successfully logged in!');
    }).catch((error) => {
        console.log('Error in authLogin: ' + error);
    });
  }

  signOut() {
    this.afAuth.auth.signOut().then((result) => {
      console.log('Signed out!');
    }, (error) => {
      console.log(error);
    });
  }
}
