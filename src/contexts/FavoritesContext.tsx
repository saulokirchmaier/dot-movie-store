/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

export interface FavoriteMovie {
  id: string;
  title: string;
  price: string;
  imageURL: string | null;
  addedAt: string;
}

interface FavoritesContextType {
  favorites: FavoriteMovie[];
  isFavorite: (movieId: string) => boolean;
  addFavorite: (movie: FavoriteMovie) => void;
  removeFavorite: (movieId: string) => void;
  toggleFavorite: (movie: FavoriteMovie) => void;
  clearFavorites: () => void;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const STORAGE_KEY = 'dot-movies-favorites';

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>(() => {
    // Carrega favoritos do localStorage ao inicializar
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      return [];
    }
  });

  // Persiste favoritos no localStorage sempre que mudar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  }, [favorites]);

  // Verifica se um filme é favorito
  const isFavorite = useCallback(
    (movieId: string): boolean => {
      return favorites.some((fav) => fav.id === movieId);
    },
    [favorites]
  );

  // Adiciona um filme aos favoritos
  const addFavorite = useCallback((movie: FavoriteMovie) => {
    setFavorites((prev) => {
      // Evita duplicatas
      if (prev.some((fav) => fav.id === movie.id)) {
        return prev;
      }
      return [...prev, { ...movie, addedAt: new Date().toISOString() }];
    });
  }, []);

  // Remove um filme dos favoritos
  const removeFavorite = useCallback((movieId: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== movieId));
  }, []);

  // Toggle: adiciona se não é favorito, remove se já é
  const toggleFavorite = useCallback(
    (movie: FavoriteMovie) => {
      if (isFavorite(movie.id)) {
        removeFavorite(movie.id);
      } else {
        addFavorite(movie);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  // Limpa todos os favoritos
  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const value = {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
    favoritesCount: favorites.length,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Hook para acessar o contexto de favoritos
 * @returns {FavoritesContextType} Objeto com funções e estado de favoritos
 * @throws {Error} Se usado fora do FavoritesProvider
 *
 * @example
 * const { favorites, isFavorite, toggleFavorite } = useFavorites();
 *
 * // Verificar se é favorito
 * const isFav = isFavorite('123');
 *
 * // Toggle favorito
 * toggleFavorite({ id: '123', title: 'Matrix', poster_path: '/abc.jpg' });
 */
export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
}
