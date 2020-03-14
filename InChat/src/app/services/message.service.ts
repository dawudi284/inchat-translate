import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  chatId: string;
  constructor(private http: HttpClient, private db: AngularFirestore) { }

  getMessages(chatId: string, userId: string) {
    return this.db.collection('chats/' + this.chatId + '/messages', ref => ref.orderBy('sendTime')).valueChanges();
  }

  //function used for sending messages. A user would send a message that would get stored on the database
  sendMessage(chatId: string, userId: string, contents: string) {
    const postUrl = 'https://us-central1-inchat-tranlsate.cloudfunctions.net/sendMessage'
    let postData = {
      'userId': userId,
      'chatId': chatId,
      'contents': contents
    }

    let response = null;
    const myObservable = this.http.post(postUrl, postData);

    const myObserver = {
      next: data => {
        const object = data;
        response = object.response;

        console.log(response);
      },
      error: err => console.error('Error on sendMessage: ' + err),
      complete: () => {
        console.log('sendMessage complete.');
      }
    };

    return response;
  }
}
