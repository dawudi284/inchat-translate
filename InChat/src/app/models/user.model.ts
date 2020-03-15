import { Time } from '@angular/common';

export interface User {
    returning: boolean;
    user: User1;
}
export interface User1 {
    uName: string;
    status: string;
    lastSeen: Time;
    language: string;
    friends?: (string)[] | null;
    chats?: (string)[] | null;
}
