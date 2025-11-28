import { ReactNode } from "react";

export interface AnimatedContainerProps {
    children: ReactNode;
    delay?: number;
    y?: number;
}