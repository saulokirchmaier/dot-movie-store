/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

export interface CartMovie {
  id: string;
  title: string;
  price: string;
  imageURL: string | null;
  addedAt: string;
}

interface ShoppingCartContextType {
  cartItems: CartMovie[];
  isInCart: (movieId: string) => boolean;
  addToCart: (movie: CartMovie) => void;
  removeFromCart: (movieId: string) => void;
  toggleCartItem: (movie: CartMovie) => void;
  clearCart: () => void;
  cartCount: number;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined
);

const STORAGE_KEY = 'dot-movies-shopping-cart';

interface ShoppingCartProviderProps {
  children: ReactNode;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartMovie[]>(() => {
    // Carrega itens do carrinho do localStorage ao inicializar
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading cart items from localStorage:', error);
      return [];
    }
  });

  // Persiste itens do carrinho no localStorage sempre que mudar
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart items to localStorage:', error);
    }
  }, [cartItems]);

  // Verifica se um filme está no carrinho
  const isInCart = useCallback(
    (movieId: string): boolean => {
      return cartItems.some((item) => item.id === movieId);
    },
    [cartItems]
  );

  // Adiciona um filme ao carrinho
  const addToCart = useCallback((movie: CartMovie) => {
    setCartItems((prev) => {
      // Evita duplicatas
      if (prev.some((item) => item.id === movie.id)) {
        return prev;
      }
      return [...prev, { ...movie, addedAt: new Date().toISOString() }];
    });
  }, []);

  // Remove um filme do carrinho
  const removeFromCart = useCallback((movieId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== movieId));
  }, []);

  // Toggle: adiciona se não está no carrinho, remove se já está
  const toggleCartItem = useCallback(
    (movie: CartMovie) => {
      if (isInCart(movie.id)) {
        removeFromCart(movie.id);
      } else {
        addToCart(movie);
      }
    },
    [isInCart, addToCart, removeFromCart]
  );

  // Limpa todos os itens do carrinho
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const value = {
    cartItems,
    isInCart,
    addToCart,
    removeFromCart,
    toggleCartItem,
    clearCart,
    cartCount: cartItems.length,
  };

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

/**
 * Hook para acessar o contexto do carrinho de compras
 * @returns {ShoppingCartContextType} Objeto com funções e estado do carrinho
 * @throws {Error} Se usado fora do ShoppingCartProvider
 *
 * @example
 * const { cartItems, isInCart, toggleCartItem } = useShoppingCart();
 *
 * // Verificar se está no carrinho
 * const inCart = isInCart('123');
 *
 * // Toggle item do carrinho
 * toggleCartItem({ id: '123', title: 'Matrix', price: '29.99', imageURL: '/abc.jpg' });
 */
export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);

  if (context === undefined) {
    throw new Error(
      'useShoppingCart must be used within a ShoppingCartProvider'
    );
  }

  return context;
}
