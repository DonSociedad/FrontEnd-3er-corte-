import { ReactNode } from "react";

export interface OptionButtonProps {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}