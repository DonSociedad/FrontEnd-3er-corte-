import Image from "next/image";
import { IAvatarEquipped } from "@/interfaces/users/user";
import { getPigAssetPath } from '@/utils/pigHelpers';

interface PigAvatarProps {
  config: IAvatarEquipped;
  className?: string; // <--- 1. Agregamos esta prop opcional
}

export default function PigAvatar({ config, className }: PigAvatarProps) {
  
  // 2. Definimos el tamaño: Si viene className externo lo usamos, si no, usamos el gigante por defecto.
  const containerClasses = className || "w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96";

  const renderLayer = (src: string | null, alt: string, zIndex: string) => {
    if (!src) return null;
    return (
      <div className={`absolute inset-0 w-full h-full ${zIndex}`}>
        <Image 
          src={src} 
          alt={alt} 
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          className="object-contain" // Esto asegura que la imagen se ajuste al contenedor
          priority={zIndex === 'z-0'}
        />
      </div>
    );
  };

  return (
    // 3. Aplicamos la clase dinámica aquí
    <div className={`relative flex items-center justify-center transition-all duration-300 ${containerClasses}`}>
      
      {renderLayer(getPigAssetPath('skins', config.skin), 'skin', 'z-0')}
      {renderLayer(getPigAssetPath('root', 'outline'), 'outline', 'z-10 pointer-events-none')}
      {renderLayer(getPigAssetPath('faces', config.mouth), 'mouth', 'z-20')}
      {renderLayer(getPigAssetPath('eyes', config.eyes), 'eyes', 'z-30')}
      {renderLayer(getPigAssetPath('bodies', config.body), 'body', 'z-40')}
      {renderLayer(getPigAssetPath('hats', config.hat), 'hat', 'z-50')}
      
    </div>
  );
}