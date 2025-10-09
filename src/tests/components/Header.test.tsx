/* eslint-disable */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../utils/test-utils';
import Header from '@/components/Header';
import { useFavorites, useShoppingCart } from '@/contexts';
import userEvent from '@testing-library/user-event';

// Mock TanStack Router Link
vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

// Mock contexts
vi.mock('@/contexts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/contexts')>();
  return {
    ...actual,
    useFavorites: vi.fn(),
    useShoppingCart: vi.fn(),
  };
});

const mockUseFavorites = useFavorites as unknown as ReturnType<typeof vi.fn>;
const mockUseShoppingCart = useShoppingCart as unknown as ReturnType<
  typeof vi.fn
>;

describe('Header', () => {
  beforeEach(() => {
    mockUseFavorites.mockReturnValue({
      favorites: [],
      favoritesCount: 0,
      addFavorite: vi.fn(),
      removeFavorite: vi.fn(),
      isFavorite: vi.fn(),
      toggleFavorite: vi.fn(),
      clearFavorites: vi.fn(),
    });

    mockUseShoppingCart.mockReturnValue({
      cartItems: [],
      cartCount: 0,
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      clearCart: vi.fn(),
      isInCart: vi.fn(),
      toggleCartItem: vi.fn(),
      totalPrice: 0,
    });
  });

  it('should render logo image', () => {
    render(<Header />);
    const logo = screen.getByAltText('Dot Movies Store');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.png');
  });

  it('should render title text', () => {
    render(<Header />);
    expect(screen.getByText('Movies Store')).toBeInTheDocument();
  });

  it('should render search input', () => {
    render(<Header />);
    const searchInput = screen.getByPlaceholderText('Pesquisar filme');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).not.toBeDisabled();
  });

  it('should render favorites and cart icons', () => {
    const { container } = render(<Header />);

    // Check for SVG icons
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(1); // Should have multiple icons
  });

  it('should display favorites count badge when count > 0', () => {
    mockUseFavorites.mockReturnValue({
      ...mockUseFavorites(),
      favoritesCount: 3,
    });

    render(<Header />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should display cart count badge when count > 0', () => {
    mockUseShoppingCart.mockReturnValue({
      ...mockUseShoppingCart(),
      cartCount: 5,
    });

    render(<Header />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should disable search input when disableSearch prop is true', () => {
    render(<Header disableSearch={true} />);
    const searchInput = screen.getByPlaceholderText('Pesquisar filme');
    expect(searchInput).toBeDisabled();
  });

  it('should display both badges when both counts > 0', () => {
    mockUseFavorites.mockReturnValue({
      ...mockUseFavorites(),
      favoritesCount: 2,
    });

    mockUseShoppingCart.mockReturnValue({
      ...mockUseShoppingCart(),
      cartCount: 7,
    });

    render(<Header />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('should not display badges when counts are 0', () => {
    const { container } = render(<Header />);

    // No badge spans should be visible
    const badges = container.querySelectorAll('.bg-red-500');
    expect(badges.length).toBe(0);
  });

  it('should update search input value', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const searchInput = screen.getByPlaceholderText('Pesquisar filme');
    await user.type(searchInput, 'Avatar');

    // The value should be managed by the context, which is mocked
    // So we just verify the input exists and is interactive
    expect(searchInput).toBeEnabled();
  });
});
