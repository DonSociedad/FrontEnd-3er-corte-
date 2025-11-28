export interface Exercise {
    _id: string;
    title: string;
    description: string;
    contentId: string; // references Content
    instructions: string;
    difficulty: 'easy' | 'medium' | 'hard';
    createdAt: Date;
}