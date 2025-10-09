/* eslint-disable */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIsMobile, useIsTablet, useIsDesktop } from '@/hooks/useMediaQuery';

describe('useMediaQuery hooks', () => {
  let matchMediaMock: any;

  beforeEach(() => {
    // Create a mock for matchMedia
    matchMediaMock = vi.fn();
    window.matchMedia = matchMediaMock;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('useIsMobile', () => {
    it('should return true when screen is mobile size', () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: '(max-width: 768px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      const { result } = renderHook(() => useIsMobile());
      expect(result.current).toBe(true);
    });

    it('should return false when screen is not mobile size', () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 768px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      const { result } = renderHook(() => useIsMobile());
      expect(result.current).toBe(false);
    });
  });

  describe('useIsTablet', () => {
    it('should return true when screen is tablet size', () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: '(min-width: 768px) and (max-width: 1024px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      const { result } = renderHook(() => useIsTablet());
      expect(result.current).toBe(true);
    });

    it('should return false when screen is not tablet size', () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(min-width: 768px) and (max-width: 1024px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      const { result } = renderHook(() => useIsTablet());
      expect(result.current).toBe(false);
    });
  });

  describe('useIsDesktop', () => {
    it('should return true when screen is desktop size', () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: '(min-width: 1024px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      const { result } = renderHook(() => useIsDesktop());
      expect(result.current).toBe(true);
    });

    it('should return false when screen is not desktop size', () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(min-width: 1024px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      const { result } = renderHook(() => useIsDesktop());
      expect(result.current).toBe(false);
    });
  });

  describe('Event listeners', () => {
    it('should add event listener on mount', () => {
      const addEventListenerMock = vi.fn();
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 768px)',
        addEventListener: addEventListenerMock,
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      renderHook(() => useIsMobile());

      expect(addEventListenerMock).toHaveBeenCalledWith(
        'change',
        expect.any(Function)
      );
    });

    it('should remove event listener on unmount', () => {
      const removeEventListenerMock = vi.fn();
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(max-width: 768px)',
        addEventListener: vi.fn(),
        removeEventListener: removeEventListenerMock,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      const { unmount } = renderHook(() => useIsMobile());
      unmount();

      expect(removeEventListenerMock).toHaveBeenCalledWith(
        'change',
        expect.any(Function)
      );
    });
  });
});
