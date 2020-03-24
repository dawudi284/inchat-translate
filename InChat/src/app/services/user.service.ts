import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore, private afAuth: AuthService) { }
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
      this.dbRef.doc(this.afAuth.Auth.auth.currentUser.uid).valueChanges().subscribe(data => {
        const user = data;
        if (user === undefined) {
          const userDB: User = {
            uName: this.afAuth.Auth.auth.currentUser.displayName,
            email: this.afAuth.Auth.auth.currentUser.email,
            status: 'offline',
            lastSeen: null,
            language: 'en-US',
            friends: [],
            chats: []
          };
          this.dbRef.doc(uId).set({ userDB });
          return;
        }
      });
    }
  }

  editUsername(newName: string) {
    this.db.collection('users').doc(this.afAuth.Auth.auth.currentUser.uid).update(
      { 'user.uName': newName }).then(() => console.log('field updated'));
  }

  
}
