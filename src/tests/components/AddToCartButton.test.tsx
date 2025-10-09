import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../utils/test-utils';
import { AddToCartButton } from '@/components/MovieCard/AddToCartButton';
import { useShoppingCart } from '@/contexts';
import userEvent from '@testing-library/user-event';

// Mock useShoppingCart
vi.mock('@/contexts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/contexts')>();
  return {
    ...actual,
    useShoppingCart: vi.fn(),
  };
});

const mockUseShoppingCart = useShoppingCart as unknown as ReturnType<
  typeof vi.fn
>;

const mockProps = {
  movieId: '1',
  movieTitle: 'Teste Movie',
  moviePrice: '29.90',
  movieImageURL: 'https://example.com/image.jpg',
};

describe('AddToCartButton', () => {
  beforeEach(() => {
    mockUseShoppingCart.mockReturnValue({
      cartItems: [],
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      clearCart: vi.fn(),
      isInCart: vi.fn(() => false),
      toggleCartItem: vi.fn(),
      cartCount: 0,
      totalPrice: 0,
    });
  });

  it('should render the button with correct text', () => {
    render(<AddToCartButton {...mockProps} />);
    expect(screen.getByText('Adicionar')).toBeInTheDocument();
  });

  it('should call addToCart when clicked', async () => {
    const user = userEvent.setup();
    const addToCartMock = vi.fn();
    mockUseShoppingCart.mockReturnValue({
      ...mockUseShoppingCart(),
      addToCart: addToCartMock,
    });

    render(<AddToCartButton {...mockProps} />);
    const button = screen.getByRole('button', { name: /adicionar/i });

    await user.click(button);

    expect(addToCartMock).toHaveBeenCalledTimes(1);

    // Check that addToCart was called with the correct shape
    const callArg = addToCartMock.mock.calls[0][0];
    expect(callArg).toMatchObject({
      id: mockProps.movieId,
      title: mockProps.movieTitle,
      price: mockProps.moviePrice,
      imageURL: mockProps.movieImageURL,
    });

    // Check that addedAt exists and is a valid ISO string
    expect(callArg.addedAt).toBeDefined();
    expect(typeof callArg.addedAt).toBe('string');
    expect(new Date(callArg.addedAt).toISOString()).toBe(callArg.addedAt);
  });

  it('should have correct styling classes', () => {
    render(<AddToCartButton {...mockProps} />);
    const button = screen.getByRole('button', { name: /adicionar/i });

    expect(button).toHaveClass('w-full');
    expect(button).toHaveClass('bg-emerald-700');
  });

  it('should be clickable', () => {
    render(<AddToCartButton {...mockProps} />);
    const button = screen.getByRole('button', { name: /adicionar/i });

    expect(button).toBeEnabled();
  });

  it('should display text in white color', () => {
    render(<AddToCartButton {...mockProps} />);
    const text = screen.getByText('Adicionar');

    expect(text).toHaveClass('text-white');
    expect(text).toHaveClass('font-bold');
  });
});
