import { Time } from '@angular/common';

export interface Message {
    userId: string;
    chatId: string;
    timeSent: Time;
    translations: Map<string, string>;
}
