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
  constructor(
    private router: Router,
    private db: AngularFirestore,
    private authService: AuthService
  ) {}

  getChats(chatId) {
    return this.db.collection<any>('chats').doc(chatId).snapshotChanges().pipe(
        map(doc => {
          const data: any = doc.payload.data();
          return { id: doc.payload.id, ...data };
        })
      );
  }

  async createchat() {
    const { uid } = await this.authService.getUser();
    const data = { uid, createdAt: Date.now(), count: 0, messages: [] };

    const docRef = await this.db.collection('chats').add(data);

    return this.router.navigate(['chatId', docRef.id]);
  }
}
