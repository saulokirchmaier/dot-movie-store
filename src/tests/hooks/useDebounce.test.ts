import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'first', delay: 300 },
      }
    );

    expect(result.current).toBe('first');

    // Change the value
    rerender({ value: 'second', delay: 300 });

    // Value should not change immediately
    expect(result.current).toBe('first');

    // Wait for debounce delay
    await waitFor(
      () => {
        expect(result.current).toBe('second');
      },
      { timeout: 1000 }
    );
  });

  it('should reset timer on rapid value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'first', delay: 300 },
      }
    );

    // Make multiple rapid changes
    rerender({ value: 'second', delay: 300 });
    await new Promise((resolve) => setTimeout(resolve, 100));

    rerender({ value: 'third', delay: 300 });
    await new Promise((resolve) => setTimeout(resolve, 100));

    rerender({ value: 'fourth', delay: 300 });

    // Value should still be 'first' immediately
    expect(result.current).toBe('first');

    // Wait for debounce to settle
    await waitFor(
      () => {
        expect(result.current).toBe('fourth');
      },
      { timeout: 1000 }
    );
  });

  it('should work with different delay values', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 200 },
      }
    );

    rerender({ value: 'updated', delay: 200 });

    await waitFor(
      () => {
        expect(result.current).toBe('updated');
      },
      { timeout: 500 }
    );
  });

  it('should work with numbers', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 0, delay: 200 },
      }
    );

    expect(result.current).toBe(0);

    rerender({ value: 42, delay: 200 });

    await waitFor(
      () => {
        expect(result.current).toBe(42);
      },
      { timeout: 500 }
    );
  });

  it('should cleanup timeout on unmount', () => {
    const { unmount } = renderHook(() => useDebounce('test', 500));

    // Should not throw error
    expect(() => unmount()).not.toThrow();
  });

  it('should work with empty strings', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'text', delay: 200 },
      }
    );

    expect(result.current).toBe('text');

    rerender({ value: '', delay: 200 });

    await waitFor(
      () => {
        expect(result.current).toBe('');
      },
      { timeout: 500 }
    );
  });
});
