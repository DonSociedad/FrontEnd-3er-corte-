'use client'

import { ReactNode } from "react";
import { useButton } from "@/hooks/useButton";

interface ButtonProps {
  type: number; //estilo
  content?: string; //texto del botón (opcional)
  icon?: ReactNode; //icono del botón (opcional)
}

//este boton es una funcion a la cual se le pasa un numero y el contenido que quieres que aparezca en el boton
export default function ButtonComponent({type, content, icon}:ButtonProps) {
  const style = useButton(type);

  return (
    <div>
        {/* Se le pasa la variable style a classname con el estilo que se quiera usar */}
        <button className={style}> 
          {/* colocas el contenido que quieres que aparezca en el boton. ejemplo "inicia sesión" o "registrar" */}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5em" }}>
            {icon}
            {content}
            </span>
        </button>
    </div>
  )
}