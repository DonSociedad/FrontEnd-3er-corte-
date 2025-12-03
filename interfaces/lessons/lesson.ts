import { z } from 'zod';
import { 
    createLessonSchema, 
    lessonBlockSchema, 
    lessonBlockPayloadSchema, 
    lessonOptionSchema 
} from '@/schemas/lesson';

// Tipos inferidos automáticamente de Zod 
export type ICreateLessonPayload = z.infer<typeof createLessonSchema>;
export type ILessonBlock = z.infer<typeof lessonBlockSchema>;
export type ILessonBlockPayload = z.infer<typeof lessonBlockPayloadSchema>;
export type ILessonOption = z.infer<typeof lessonOptionSchema>;

// Interfaces adicionales para la UI o respuestas del Backend
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