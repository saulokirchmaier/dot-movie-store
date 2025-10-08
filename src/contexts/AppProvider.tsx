import type { ReactNode } from 'react';
import { SearchProvider } from './SearchContext';
import { FavoritesProvider } from './FavoritesContext';
import { ShoppingCartProvider } from './ShoppingCartContext';

interface AppProviderProps {
  children: ReactNode;
}

/**
 * AppProvider - Provider principal da aplicação
 *
 * Envolve todos os Contexts da aplicação em um único componente,
 * simplificando o setup no main.tsx e facilitando a adição de novos Contexts.
 *
 * @example
 * // main.tsx
 * import { AppProvider } from './contexts';
 *
 * <AppProvider>
 *   <App />
 * </AppProvider>
 */
export function AppProvider({ children }: AppProviderProps) {
  return (
    <FavoritesProvider>
      <ShoppingCartProvider>
        <SearchProvider>{children}</SearchProvider>
      </ShoppingCartProvider>
    </FavoritesProvider>
  );
}
