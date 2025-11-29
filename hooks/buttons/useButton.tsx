'use client'; // 👈 Necesario para que funcione en el cliente

export function useButton(type: number): string {
  let style = "";

  switch (type) {
    case 1:
      style =
        "text-black hover:text-pink-400 font-medium py-2 px-4 rounded-lg transition"; // botón de login y register en el header
      break;

    case 2:
      style =
        "w-full bg-[#f0b9a8ff] hover:bg-pink-200 text-black font-medium py-2 rounded-lg transition"; // botón de iniciar sesión
      break;

    case 3:
      style =
        "w-28 bg-pink-400 hover:bg-pink-200 text-black font-medium py-2 rounded-lg transition"; // botón de 'necesitas ayuda'
      break;

    default:
      style = "bg-black text-white"; // estilo por defecto
      break;
  }

  return style;
}
