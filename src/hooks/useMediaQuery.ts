import { useState, useEffect } from 'react';

/**
 * Hook para detectar media queries e tamanhos de tela
 *
 * @param query - Media query CSS (ex: '(max-width: 768px)')
 * @returns boolean indicando se a media query corresponde
 *
 * @example
 * // Detectar mobile
 * const isMobile = useMediaQuery('(max-width: 768px)');
 *
 * @example
 * // Detectar tablet
 * const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Cria o media query
    const mediaQuery = window.matchMedia(query);

    // Define o estado inicial
    setMatches(mediaQuery.matches);

    // Handler para mudanças
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Adiciona listener
    mediaQuery.addEventListener('change', handler);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}

/**
 * Hook específico para detectar dispositivos mobile
 * @returns boolean indicando se é mobile (max-width: 768px)
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)');
}

/**
 * Hook específico para detectar tablets
 * @returns boolean indicando se é tablet (769px - 1024px)
 */
export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
}

/**
 * Hook específico para detectar desktop
 * @returns boolean indicando se é desktop (min-width: 1025px)
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)');
}

/**
 * Hook que retorna informações completas sobre o tamanho da tela
 * @returns objeto com flags para mobile, tablet e desktop
 */
export function useScreenSize() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  return {
    isMobile,
    isTablet,
    isDesktop,
    // Atalhos úteis
    isMobileOrTablet: isMobile || isTablet,
    isTabletOrDesktop: isTablet || isDesktop,
  };
}
