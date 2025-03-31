import React from 'react';
import { useLocation } from 'react-router-dom';

interface PageTitleProps {
  title?: string;
}

export function PageTitle({ title }: PageTitleProps) {
  const location = useLocation();
  
  // Mapping des chemins aux titres de page (correspondant aux termes du menu)
  const pathToTitle: Record<string, string> = {
    '/': 'Accueil',
    '/report': 'Dénoncer un comportement abusif',
    '/reports': 'Consulter les cas répertoriés',
    '/faq': 'Questions fréquentes',
    '/donate': 'Faire un don',
    '/admin': 'Administration',
  };
  
  // Fonction pour déterminer le titre en fonction du chemin
  const getTitleFromPath = (path: string) => {
    // Cas exact
    if (pathToTitle[path]) return pathToTitle[path];
    
    // Cas pour les routes dynamiques
    if (path.startsWith('/reports/')) {
      return 'Détail du signalement';
    }
    
    return '';
  };
  
  // Utiliser le titre fourni en prop ou le titre correspondant au chemin actuel
  const pageTitle = title || getTitleFromPath(location.pathname);
  
  if (!pageTitle) return null;
  
  return (
    <div className="flex items-center justify-center my-6 w-full max-w-[1152px] mx-auto">
      <div className="h-[1px] flex-grow bg-[#bf273a] translate-y-[1px]"></div>
      <h2 className="font-normal text-center whitespace-nowrap mb-0 text-2xl px-5 mx-5">{pageTitle}</h2>
      <div className="h-[1px] flex-grow bg-[#bf273a] translate-y-[1px]"></div>
    </div>
  );
}