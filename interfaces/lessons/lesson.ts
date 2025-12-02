export interface LessonMapItem {
  id: string;
  title: string;
  order: number;
  status: "completed" | "available" | "locked";
}

export interface IAdminLesson {
  id: string;
  title: string;
  order: number;
  prerequisites: number;      
  contentBlocksCount: number; 
}

export interface ILessonOption {
    id: string;   // "a", "b", "c"
    text: string;
}

export interface ILessonBlockPayload {
    prompt: string;         
    options: ILessonOption[];
    correctOptionId: string; 
    explanation: string;
}

export interface ILessonBlock {
    type: 'multiple_choice'; // Por ahora solo este tipo
    payload: ILessonBlockPayload;
}

export interface ICreateLessonPayload {
    title: string;
    order: number;
    prerequisites: string[]; 
    contentBlocks: ILessonBlock[];
}