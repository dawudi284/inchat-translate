import { User } from './user.model';

export interface Chat {
    chatId: string;
    chat: ChatsEntity;
}
export interface ChatsEntity {
    users?: (string)[] | null;
    messages?: (string)[] | null;
}
