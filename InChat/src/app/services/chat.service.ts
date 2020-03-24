import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { AuthService } from './auth.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private db: AngularFirestore, private afAuth: AuthService, private router:Router) { }

  getUserChats(collection: string) {
    console.log('in get user chats');
    let ids: any;
    let finished = false;
    const items = this.db.collection(collection).valueChanges({ idField: collection + 'ids' });
    const myObserver = {
      next: data => {
        console.log('in next');
      },
      error: err => console.error('Error on getUserChats: ' + err),
      complete: () => {
        console.log('complete');
        finished = true;
        console.log('ids: ' + ids);
      }
    };
    items.subscribe(myObserver);
  }

  async createchat() {
    const uid  = await this.afAuth.Auth.auth.currentUser.uid;
    const data = { uid, createdAt: Date.now(), count: 0, messages: [] };

    const docRef = await this.db.collection('chats').add(data);

    return this.router.navigate(['chatId', docRef.id]);
  }
}
