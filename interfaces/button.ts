import { ReactNode } from "react";

export interface ButtonProps {
  type: number; //estilo
  content?: ReactNode; //texto del botón (opcional)
  icon?: ReactNode; //icono del botón (opcional)
  onClick?: () => void;
}
