import { Time } from '@angular/common';

export interface Message {
    userId: string;
    chatId: string;
    timeSent: Time;
    translation?: (TranslationEntity)[] | null;
}
export interface TranslationEntity {
    language: string;
    message: string;
}
