import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FriendsService {

<<<<<<< HEAD
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

  /*
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
  */

  listFriends(uID: string){
    var names = [];
    for(var fID in this.dbRef.doc(uID)['friends']){
      names.push(this.dbRef.doc(fID)['friends']);
    }
  }

  deleteFriend(uID: string, fID: string){
    var friends = this.dbRef.doc(uID)["friends"];
    var index = friends.indexOf(fID);
    if(index > -1){
      friends.splice(index, 1);
    }
    this.dbRef.doc(uID).update({friends: friends});   
  }

  addFriend(uID: string, fID: string){
    var friends = this.dbRef.doc(uID)["friends"];
    friends.push(fID);
    this.dbRef.doc(uID).update({friends: friends});
  }

  /*
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
  */
=======
  constructor() { }
>>>>>>> b335f726fca90d3c3b028325c183fa95934d64e1

}
