import Image from "next/image";
import { IAvatarEquipped } from "@/interfaces/users/user";
import { getPigAssetPath } from '@/utils/pigHelpers';

interface PigAvatarProps {
  config: IAvatarEquipped;
}

export default function PigAvatar({ config }: PigAvatarProps) {
  // Helper para renderizar capas de forma segura y limpia
  const renderLayer = (src: string | null, alt: string, zIndex: string) => {
    if (!src) return null;
    return (
      <div className={`absolute inset-0 w-full h-full ${zIndex}`}>
        <Image 
          src={src} 
          alt={alt} 
          fill
          sizes="(max-width: 768px) 100vw, 500px" // Importante para optimización
          className="object-contain"
          priority={zIndex === 'z-0'} // Priorizar la carga de la piel
        />
      </div>
    );
  };

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center transition-all duration-300">
      
      {/* 1. SKIN (Fondo) */}
      {renderLayer(getPigAssetPath('skins', config.skin), 'skin', 'z-0')}

      {/* 2. OUTLINE (Línea negra obligatoria - root) */}
      {renderLayer(getPigAssetPath('root', 'outline'), 'outline', 'z-10 pointer-events-none')}

      {/* 3. MOUTH (Boca) */}
      {renderLayer(getPigAssetPath('faces', config.mouth), 'mouth', 'z-20')}

      {/* 4. EYES (Ojos) */}
      {renderLayer(getPigAssetPath('eyes', config.eyes), 'eyes', 'z-30')}

      {/* 5. BODY (Ropa) */}
      {renderLayer(getPigAssetPath('bodies', config.body), 'body', 'z-40')}

      {/* 6. HAT (Sombrero) */}
      {renderLayer(getPigAssetPath('hats', config.hat), 'hat', 'z-50')}
      
    </div>
  );
}