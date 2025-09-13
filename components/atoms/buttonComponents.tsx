import { ReactNode } from "react";

interface ButtonProps {
  type: number; //estilo
  content?: string; //texto del botón (opcional)
  icon?: ReactNode; //icono del botón (opcional)
}

//este boton es una funcion a la cual se le pasa un numero y el contenido que quieres que aparezca en el boton
export default function ButtonComponent({type, content, icon}:ButtonProps) {

  let style;
  //en base al numero que le pases este adoptara determinado estilo, correspondiente a ese numer

  switch (type) {
    case 1:
      style = "text-black hover:text-pink-400 font-medium py-2 px-4 rounded-lg transition"; // boton de login y register en el header
      break;
    case 2:
      style = "w-full bg-pink-400 hover:bg-pink-200 text-black font-medium py-2 rounded-lg transition"; // iniciar sesion
      break;
    case 3:
      style = "w-full bg-pink-400 hover:bg-pink-200 text-black font-medium py-2 rounded-lg transition"; // negro de necesitas ayuda
      break;
    default:
      style = "bg-black-500 text-white-500";
  }
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