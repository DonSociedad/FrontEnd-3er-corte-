'use client'

import { ReactNode } from "react";

export interface ButtonProps {
  type: number; //estilo
  content?: string; //texto del botón (opcional)
  icon?: ReactNode; //icono del botón (opcional)
}
