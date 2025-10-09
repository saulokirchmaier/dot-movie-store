import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  ShoppingCartProvider,
  useShoppingCart,
} from '@/contexts/ShoppingCartContext';
import { mockMovie, mockMovies } from '../utils/mockData';
import type { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <ShoppingCartProvider>{children}</ShoppingCartProvider>
);

describe('ShoppingCartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should start with empty cart', () => {
    const { result } = renderHook(() => useShoppingCart(), { wrapper });

    expect(result.current.cartItems).toEqual([]);
    expect(result.current.cartCount).toBe(0);
  });

  it('should add a movie to cart', () => {
    const { result } = renderHook(() => useShoppingCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockMovie);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].id).toBe(mockMovie.id);
    expect(result.current.cartItems[0].title).toBe(mockMovie.title);
    expect(result.current.cartCount).toBe(1);
  });

  it('should remove a movie from cart', () => {
    const { result } = renderHook(() => useShoppingCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockMovie);
    });

    expect(result.current.cartItems).toHaveLength(1);

    act(() => {
      result.current.removeFromCart(mockMovie.id);
    });

    expect(result.current.cartItems).toHaveLength(0);
    expect(result.current.cartCount).toBe(0);
  });

  it('should check if a movie is in cart', () => {
    const { result } = renderHook(() => useShoppingCart(), { wrapper });

    expect(result.current.isInCart(mockMovie.id)).toBe(false);

    act(() => {
      result.current.addToCart(mockMovie);
    });

    expect(result.current.isInCart(mockMovie.id)).toBe(true);
  });

  it('should toggle cart item', () => {
    const { result } = renderHook(() => useShoppingCart(), { wrapper });

    act(() => {
      result.current.toggleCartItem(mockMovie);
    });

    expect(result.current.isInCart(mockMovie.id)).toBe(true);

    act(() => {
      result.current.toggleCartItem(mockMovie);
    });

    expect(result.current.isInCart(mockMovie.id)).toBe(false);
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useShoppingCart(), { wrapper });

    act(() => {
      mockMovies.forEach((movie) => result.current.addToCart(movie));
    });

    expect(result.current.cartItems).toHaveLength(3);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cartItems).toHaveLength(0);
    expect(result.current.cartCount).toBe(0);
  });

  it('should persist cart to localStorage', () => {
    const { result } = renderHook(() => useShoppingCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockMovie);
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'dot-movies-shopping-cart',
      expect.any(String)
    );
  });

  it('should not add duplicate items', () => {
    const { result } = renderHook(() => useShoppingCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockMovie);
      result.current.addToCart(mockMovie);
    });

    expect(result.current.cartItems).toHaveLength(1);
  });

  it('should calculate cart count correctly', () => {
    const { result } = renderHook(() => useShoppingCart(), { wrapper });

    expect(result.current.cartCount).toBe(0);

    act(() => {
      result.current.addToCart(mockMovies[0]);
    });

    expect(result.current.cartCount).toBe(1);

    act(() => {
      result.current.addToCart(mockMovies[1]);
      result.current.addToCart(mockMovies[2]);
    });

    expect(result.current.cartCount).toBe(3);
  });
});
