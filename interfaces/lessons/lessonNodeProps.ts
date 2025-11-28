export interface LessonNodeProps {
    status: "completed" | "available" | "locked";
    onClick?: () => void;
    title?: string;
}