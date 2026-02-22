export interface User {
    id: string;
    name: string;
    age: number;
    location: string;
    interests: string[];
    bio: string;
    avatar: string;
    isConnected: boolean;
}
export interface JournalEntry {
    id: string;
    userId: string;
    date: Date;
    videoUrl?: string;
    thumbnail?: string;
    aiSummary: string;
    extractedTopics: string[];
    mood: 'happy' | 'neutral' | 'sad' | 'excited';
    duration: number;
}
export interface Memory {
    id: string;
    journalId: string;
    date: Date;
    description: string;
    importance: 'high' | 'medium' | 'low';
    category: string;
    relatedPeople?: string[];
}
export interface HappyMoment {
    id: string;
    date: Date;
    description: string;
    conversationWith?: string;
    source: 'journal' | 'chat' | 'call';
}
export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: Date;
    isHappyMoment?: boolean;
}
export declare const currentUser: User;
export declare const users: User[];
export declare const journalEntries: JournalEntry[];
export declare const memories: Memory[];
export declare const happyMoments: HappyMoment[];
export declare const messages: {
    [userId: string]: Message[];
};
//# sourceMappingURL=mockData.d.ts.map