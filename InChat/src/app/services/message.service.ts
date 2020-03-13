import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  chatId: string;
  constructor(private db: AngularFirestore) { }

  getMessages() {
    return this.db.collection('chats' + this.chatId + '/messages', ref => ref.orderBy('sendTime')).valueChanges();
  }



}
