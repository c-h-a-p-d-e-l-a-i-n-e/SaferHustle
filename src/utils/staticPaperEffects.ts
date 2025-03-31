import { generateRandomClipPath, generateRandomRotation } from './paperEffect';

// Générer un nombre fixe de patterns pour différents éléments
const generateStaticPatterns = (count: number) => {
  const patterns = [];
  
  for (let i = 0; i < count; i++) {
    patterns.push({
      clipPath: generateRandomClipPath(),
      rotation: generateRandomRotation()
    });
  }
  
  return patterns;
};

// Générer 20 patterns différents pour couvrir tous les éléments de l'application
export const staticPatterns = generateStaticPatterns(20);

// Fonction pour obtenir un pattern basé sur un index
export const getStaticPattern = (index: number) => {
  // Utiliser le modulo pour s'assurer que l'index est dans les limites du tableau
  const safeIndex = index % staticPatterns.length;
  return staticPatterns[safeIndex];
};