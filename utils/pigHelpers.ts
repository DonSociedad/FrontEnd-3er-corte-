export const getPigAssetPath = (category: string, key: string) => {
  const basePath = '/images/pig';
  
  if (category === 'root') return `${basePath}/${key}.png`;
  
  if (!key || key === 'none' || key.includes('none')) return null;

  return `${basePath}/${category}/${key}.png`;
};