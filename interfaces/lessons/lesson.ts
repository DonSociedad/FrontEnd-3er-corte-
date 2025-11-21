export interface LessonMapItem {
  id: string;
  title: string;
  order: number;
  status: "completed" | "available" | "locked";
}
