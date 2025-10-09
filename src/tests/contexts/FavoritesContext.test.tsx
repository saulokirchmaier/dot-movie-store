import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from '@/contexts/FavoritesContext';
import { mockMovie, mockMovies } from '../utils/mockData';
import type { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <FavoritesProvider>{children}</FavoritesProvider>
);

describe('FavoritesContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should start with empty favorites', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.favorites).toEqual([]);
    expect(result.current.favoritesCount).toBe(0);
  });

  it('should add a movie to favorites', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(mockMovie);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].id).toBe(mockMovie.id);
    expect(result.current.favorites[0].title).toBe(mockMovie.title);
    expect(result.current.favoritesCount).toBe(1);
  });

  it('should remove a movie from favorites', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(mockMovie);
    });

    expect(result.current.favorites).toHaveLength(1);

    act(() => {
      result.current.removeFavorite(mockMovie.id);
    });

    expect(result.current.favorites).toHaveLength(0);
    expect(result.current.favoritesCount).toBe(0);
  });

  it('should check if a movie is favorite', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current.isFavorite(mockMovie.id)).toBe(false);

    act(() => {
      result.current.addFavorite(mockMovie);
    });

    expect(result.current.isFavorite(mockMovie.id)).toBe(true);
  });

  it('should toggle favorite status', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.toggleFavorite(mockMovie);
    });

    expect(result.current.isFavorite(mockMovie.id)).toBe(true);

    act(() => {
      result.current.toggleFavorite(mockMovie);
    });

    expect(result.current.isFavorite(mockMovie.id)).toBe(false);
  });

  it('should clear all favorites', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      mockMovies.forEach((movie) => result.current.addFavorite(movie));
    });

    expect(result.current.favorites).toHaveLength(3);

    act(() => {
      result.current.clearFavorites();
    });

    expect(result.current.favorites).toHaveLength(0);
    expect(result.current.favoritesCount).toBe(0);
  });

  it('should persist favorites to localStorage', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(mockMovie);
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'dot-movies-favorites',
      expect.any(String)
    );
  });

  it('should not add duplicate favorites', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper });

    act(() => {
      result.current.addFavorite(mockMovie);
      result.current.addFavorite(mockMovie);
    });

    expect(result.current.favorites).toHaveLength(1);
  });
});
