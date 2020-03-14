import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';
import { AuthService } from './auth.service';
import { Message, TranslationEntity} from '../models/message.model';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  chatId: string;
  constructor(private db: AngularFirestore,  private afAuth: AuthService) { }

  sendMessages(messageContent: string) {
    let message: Message;
    message.messId = '123';
    message.chatId = '456';
    let translation: TranslationEntity = {
      language: 'english',
      message: 'hello'
    };
    message.translation.push(translation);
    this.db.collection('messages').add(message);
  }

}
