import { ReactNode } from "react";

export interface ModalButtonProps {
    buttonLabel?: string;
    icon?: ReactNode; // El ícono es opcional
    buttonStyle?: string;
    children: React.ReactNode; // contenido que irá dentro del modal
}