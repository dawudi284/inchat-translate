
export interface Chat {
    chat: ChatsEntity;
    languages: string[];
}

export interface ChatsEntity {
    users?: (string)[] | null;
    messages?: (string)[] | null;
}
