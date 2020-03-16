import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private db: AngularFirestore, private afAuth: AuthService) { }
  dbRef = this.db.collection('users');
  currentUser = this.afAuth.Auth.auth.currentUser;
  users: AngularFirestoreDocument<User>;

  async deleteUser(uId: string) {
    await this.db.collection('users').doc(uId).delete();
    return true;
  }

  async doesUserExist(uId: string) {
    let docExist: boolean;
    const docRef = this.dbRef.doc(uId);
    await docRef.get().toPromise().then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data());
        docExist = true;
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
        docExist = false;
      }
    }).catch((error) => {
      console.log('Error getting document:', error);
    });
    console.log(docExist);
    return docExist;
  }

  createUser(uId: string) {
    if (this.afAuth.Auth.auth.currentUser) {
      console.log(this.afAuth.Auth.auth.currentUser);
      this.dbRef.doc(this.afAuth.Auth.auth.currentUser.uid).valueChanges().subscribe(data => {
        const user = data;
        if (user === undefined) {
          console.log('added');
          const user: User = {
            uName: this.afAuth.Auth.auth.currentUser.displayName,
            status: 'offline',
            lastSeen: null,
            language: 'en-US',
            friends: [],
            chats: []
          };
          this.dbRef.doc(uId).set({ user });
          return;
        }
      }
      );
    }

  }

  editUsername(newName: string) {
    this.db.collection('users').doc(this.afAuth.Auth.auth.currentUser.uid).update(
      { 'user.uName': newName}).then(() => console.log('field updated'));
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
