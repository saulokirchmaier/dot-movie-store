/**
 * Contexts Index
 * Centraliza todas as exportações dos Contexts para facilitar imports
 */

// App Provider (Principal - Envolve todos os Contexts)
export { AppProvider } from './AppProvider';

// Search Context
export { SearchProvider, useSearch } from './SearchContext';

// Favorites Context
export { FavoritesProvider, useFavorites } from './FavoritesContext';

// Shopping Cart Context
export { ShoppingCartProvider, useShoppingCart } from './ShoppingCartContext';

// Re-exporta tipos se necessário
export type { FavoriteMovie } from './FavoritesContext';
export type { CartMovie } from './ShoppingCartContext';
