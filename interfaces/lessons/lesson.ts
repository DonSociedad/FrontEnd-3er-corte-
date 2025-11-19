export interface LessonMapItem {
  id: string;
  title: string;
  order: number;
  prerequisites: string[];
  status: "completed" | "available" | "locked";
}
