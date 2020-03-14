import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private db: AngularFirestore, private afAuth: AuthService) { }
  dbRef = this.db.collection('users');
  currentUser = this.afAuth.Auth.auth.currentUser;
  /*doesUserExist(userId: string) {
    const postUrl = 'https://us-central1-inchat-tranlsate.cloudfunctions.net/doesUserExist';
    let postData = {
      'userId': userId
    };

    let response = null;
    const myObservable = this.http.post(postUrl, postData);

    const myObserver = {
      next: data => {
        const object = data;
        response = object.reponse;

        console.log(response);
      },
      error: err => console.error('Error on doesUserExist: ' + err),
      complete: () => {
        console.log('doesUserExist complete.');
        return response;
      }
    };
    myObservable.subscribe(myObserver);
  }*/

  /*deleteUser(userId: string) {
    console.log('deleteUser called');
    const postUrl = 'https://us-central1-inchat-tranlsate.cloudfunctions.net/deleteUser';
    const postData = {
      'userId': userId
    };

    let response = null;
    const myObservable = this.http.post(postUrl, postData);

    const myObserver = {
      next: data => {
        const object = data;
        response = object.reponse;
        console.log(response);
      },
      error: err => console.error('Error on deleteUser: ' + err),
      complete: () => {
        console.log('deleteUser complete.');
        console.log(response);
      }
    };
    myObservable.subscribe(myObserver);
  }*/

  deleteUser(uId: string) {
    this.db.collection('users').doc(uId).delete();
  }

  doesUserExist(uId: string) {
    if (this.db.collection('users').doc(uId).get()) {
      console.log('User Exists');
    } else {
      console.log('user does not exist');
    }
  }

  async addUser(uId: string) {
    await this.dbRef.add(uId);
    this.dbRef.doc(uId).set({
      uName: this.currentUser.displayName,
      status: '',
      lastSeen: '',
      language: 'english',
      friends: [],
      chats: []
    });
  }


 

  getDocumentIds(collection: string) {
    console.log('in get doc ids');
    let ids: any;
    let finished = false;
    const items = this.db.collection(collection).valueChanges({ idField: collection + 'ids' });
    const myObserver = {
      next: data => {
        console.log('in next');
      },
      error: err => console.error('Error on getDocIds: ' + err),
      complete: () => {
        console.log('complete');
        finished = true;
        console.log('ids: ' + ids);
      }
    };
    items.subscribe(myObserver);

  }
}
