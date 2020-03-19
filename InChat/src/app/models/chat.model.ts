
export interface Chat {
    chatId: string;
    chat: ChatsEntity;
    languages: string[];
}

export interface ChatsEntity {
    users?: (string)[] | null;
    messages?: (string)[] | null;
}
