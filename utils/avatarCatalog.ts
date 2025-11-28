// src/utils/avatarCatalog.ts

export type AvatarCategory = 'skins' | 'hats' | 'eyes' | 'faces' | 'bodies';

interface CatalogItem {
  id: string;
  name: string;
  category: AvatarCategory;
}

export const AVATAR_CATALOG: CatalogItem[] = [
  // SKINS
  { id: 'pig_skin', name: 'Clásico', category: 'skins' },
  { id: 'metal_pig_skin', name: 'Robot', category: 'skins' },
  { id: 'blue_pig_skin', name: 'Azul', category: 'skins' },
  { id: 'aquarium_pig_skin', name: 'Acuario', category: 'skins' },
  { id: 'brown_pig_skin', name: 'Bronceado', category: 'skins' },

  // HATS
  { id: 'none', name: 'Nada', category: 'hats' }, //deafult
  { id: 'top_hat', name: 'Copa', category: 'hats' },
  { id: 'grad_cap', name: 'Graduado', category: 'hats' },
  { id: 'chef_hat', name: 'Chef', category: 'hats' },
  { id: 'party_hat', name: 'Fiesta', category: 'hats' },
  { id: 'remy_chef_hat', name: 'Maestro', category: 'hats' },

  // BODIES 
  { id: 'none', name: 'Nada', category: 'bodies' }, //default
  { id: 'suit', name: 'Traje', category: 'bodies' },
  { id: 'windup_key', name: 'Cuerda', category: 'bodies' },
  { id: 'hamster_wheel', name: 'Rueda', category: 'bodies' },
  { id: 'doll_clip', name: 'Gancho', category: 'bodies' },
  { id: 'edge_skirt', name: 'Falda', category: 'bodies' },

  // EYES
  { id: 'none', name: 'Nada', category: 'eyes' }, //default
  { id: 'pixel_sunglasses', name: 'Pixel', category: 'eyes' },
  { id: 'anime_eyes', name: 'Anime', category: 'eyes' },
  { id: 'blue_glasses', name: 'Gafas', category: 'eyes' },
  { id: 'crazy_eyes', name: 'Loco', category: 'eyes' },
  { id: 'eye_patch', name: 'Parche', category: 'eyes' },

  // FACES 
  { id: 'none', name: 'Nada', category: 'faces' }, //default
  { id: 'smile_curve', name: 'Sonrisa', category: 'faces' }, 
  { id: 'toothy_mouth', name: 'Dientes', category: 'faces' },
  { id: 'mustache', name: 'Bigote', category: 'faces' },
  { id: 'apple_bite', name: 'Manzana', category: 'faces' },
  { id: 'rose_bite', name: 'Rosa', category: 'faces' },
];

export const getItemsByCategory = (category: AvatarCategory) => {
  return AVATAR_CATALOG.filter(item => item.category === category);
};