import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSearch } from '@/contexts';
import { SearchProvider } from '@/contexts/SearchContext';
import type { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <SearchProvider>{children}</SearchProvider>
);

describe('SearchContext', () => {
  it('should start with empty search query', () => {
    const { result } = renderHook(() => useSearch(), { wrapper });
    expect(result.current.searchQuery).toBe('');
  });

  it('should update search query', () => {
    const { result } = renderHook(() => useSearch(), { wrapper });

    act(() => {
      result.current.setSearchQuery('avatar');
    });

    expect(result.current.searchQuery).toBe('avatar');
  });

  it('should clear search query', () => {
    const { result } = renderHook(() => useSearch(), { wrapper });

    act(() => {
      result.current.setSearchQuery('avatar');
    });
    expect(result.current.searchQuery).toBe('avatar');

    act(() => {
      result.current.setSearchQuery('');
    });
    expect(result.current.searchQuery).toBe('');
  });

  it('should handle multiple search query updates', () => {
    const { result } = renderHook(() => useSearch(), { wrapper });

    act(() => {
      result.current.setSearchQuery('first');
    });
    expect(result.current.searchQuery).toBe('first');

    act(() => {
      result.current.setSearchQuery('second');
    });
    expect(result.current.searchQuery).toBe('second');

    act(() => {
      result.current.setSearchQuery('third');
    });
    expect(result.current.searchQuery).toBe('third');
  });

  it('should handle special characters in search query', () => {
    const { result } = renderHook(() => useSearch(), { wrapper });

    act(() => {
      result.current.setSearchQuery('avengers: endgame');
    });
    expect(result.current.searchQuery).toBe('avengers: endgame');

    act(() => {
      result.current.setSearchQuery('movie@2024!');
    });
    expect(result.current.searchQuery).toBe('movie@2024!');
  });

  it('should handle whitespace in search query', () => {
    const { result } = renderHook(() => useSearch(), { wrapper });

    act(() => {
      result.current.setSearchQuery('  spaces  ');
    });
    expect(result.current.searchQuery).toBe('  spaces  ');
  });

  it('should persist search query across re-renders', () => {
    const { result, rerender } = renderHook(() => useSearch(), { wrapper });

    act(() => {
      result.current.setSearchQuery('persistent');
    });
    expect(result.current.searchQuery).toBe('persistent');

    rerender();
    expect(result.current.searchQuery).toBe('persistent');
  });
});
