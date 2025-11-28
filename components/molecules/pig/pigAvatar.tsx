import { IAvatarEquipped } from "@/interfaces/users/user";
import { getPigAssetPath } from '@/utils/pigHelpers';

interface PigAvatarProps {
  config: IAvatarEquipped;
}

export default function PigAvatar({ config }: PigAvatarProps) {
  // Orden de capas 
  // 1. Skin (Fondo)
  // 2. Outline (Líneas negras del cuerpo)
  // 3. Face (Boca)
  // 4. Eyes (Ojos)
  // 5. Body (Ropa) - La ropa tapa el cuerpo
  // 6. Hat (Sombrero) - Tapa todo

  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
      
      {/* 1. SKIN (Base de color) */}
      <img 
        src={getPigAssetPath('skins', config.skin) || ''} 
        alt="skin" 
        className="absolute inset-0 w-full h-full object-contain z-0" 
      />

      {/* 2. OUTLINE (Línea negra obligatoria) */}
      <img 
        src={getPigAssetPath('root', 'outline') || ''} 
        alt="outline" 
        className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none" 
      />

      {/* 3. MOUTH (Boca) */}
      {config.mouth && getPigAssetPath('faces', config.mouth) && (
        <img 
          src={getPigAssetPath('faces', config.mouth)!} 
          alt="mouth" 
          className="absolute inset-0 w-full h-full object-contain z-20" 
        />
      )}

      {/* 4. EYES (Ojos) */}
      {config.eyes && getPigAssetPath('eyes', config.eyes) && (
        <img 
          src={getPigAssetPath('eyes', config.eyes)!} 
          alt="eyes" 
          className="absolute inset-0 w-full h-full object-contain z-30" 
        />
      )}

      {/* 5. BODY (Ropa) */}
      {config.body && getPigAssetPath('bodies', config.body) && (
        <img 
          src={getPigAssetPath('bodies', config.body)!} 
          alt="body" 
          className="absolute inset-0 w-full h-full object-contain z-40" 
        />
      )}

      {/* 6. HAT (Sombrero) */}
      {config.hat && getPigAssetPath('hats', config.hat) && (
        <img 
          src={getPigAssetPath('hats', config.hat)!} 
          alt="hat" 
          className="absolute inset-0 w-full h-full object-contain z-50" 
        />
      )}
    </div>
  );
}