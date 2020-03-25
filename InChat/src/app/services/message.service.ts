import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { AuthService } from './auth.service';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  chatId: string;
  constructor(private db: AngularFirestore, private afAuth: AuthService) { }

  getMessages(chatId: string, userId: string) {
    return this.db.collection('chats/' + this.chatId + '/messages', ref => ref.orderBy('timeSent')).valueChanges();
  }

  // function used for sending messages. A user would send a message that would get stored on the database
  sendMessage(chatId: string = 'test-id', contents: string) {
    let date: Date;
    date.getDate();
    let message: Message; // message object to be stored in database
    message.chatId = chatId;
    message.userId = this.afAuth.Auth.auth.currentUser.uid;

    this.db.collection('messages').add(message).then((docRef) => {
      console.log('Message logged with ID: ', docRef.id);
    }).catch((error) => {
      console.error('Error adding document: ', error);
    });
  }
}
