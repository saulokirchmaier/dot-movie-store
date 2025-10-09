/* eslint-disable */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../utils/test-utils';
import { ShoppingCartModal } from '@/components/ShoppingCartModal';
import { useShoppingCart } from '@/contexts';

// Mock TanStack Router
vi.mock('@tanstack/react-router', () => ({
  useNavigate: vi.fn(() => vi.fn()),
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

// Mock contexts
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

describe('ShoppingCartModal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
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

  it('should not render when isOpen is false', () => {
    render(<ShoppingCartModal isOpen={false} onClose={mockOnClose} />);

    expect(screen.queryByText('Meu Carrinho')).not.toBeInTheDocument();
  });

  it('should render when isOpen is true', () => {
    render(<ShoppingCartModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Meu Carrinho')).toBeInTheDocument();
  });

  it('should show empty state when cart is empty', () => {
    render(<ShoppingCartModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument();
    expect(
      screen.getByText('Adicione filmes ao carrinho para começar sua compra')
    ).toBeInTheDocument();
  });

  it('should display cart items when they exist', () => {
    mockUseShoppingCart.mockReturnValue({
      ...mockUseShoppingCart(),
      cartItems: [
        {
          id: '1',
          title: 'Test Movie',
          imageURL: 'test.jpg',
          price: '29.90',
          addedAt: new Date().toISOString(),
        },
      ],
      cartCount: 1,
    });

    render(<ShoppingCartModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('R$ 29.90')).toBeInTheDocument();
  });

  it('should display total price', () => {
    mockUseShoppingCart.mockReturnValue({
      ...mockUseShoppingCart(),
      cartItems: [
        {
          id: '1',
          title: 'Movie 1',
          imageURL: 'test1.jpg',
          price: '29.90',
          addedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Movie 2',
          imageURL: 'test2.jpg',
          price: '30.10',
          addedAt: new Date().toISOString(),
        },
      ],
      cartCount: 2,
    });

    render(<ShoppingCartModal isOpen={true} onClose={mockOnClose} />);

    // Total should be 29.90 + 30.10 = 60.00
    expect(screen.getByText(/R\$\s*60,00/)).toBeInTheDocument();
  });

  it('should display cart count', () => {
    mockUseShoppingCart.mockReturnValue({
      ...mockUseShoppingCart(),
      cartItems: [
        {
          id: '1',
          title: 'Movie 1',
          imageURL: 'test1.jpg',
          price: '29.90',
          addedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Movie 2',
          imageURL: 'test2.jpg',
          price: '39.90',
          addedAt: new Date().toISOString(),
        },
      ],
      cartCount: 2,
    });

    render(<ShoppingCartModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('2 itens no carrinho')).toBeInTheDocument();
  });

  it('should display singular form for count of 1', () => {
    mockUseShoppingCart.mockReturnValue({
      ...mockUseShoppingCart(),
      cartItems: [
        {
          id: '1',
          title: 'Movie 1',
          imageURL: 'test1.jpg',
          price: '29.90',
          addedAt: new Date().toISOString(),
        },
      ],
      cartCount: 1,
    });

    render(<ShoppingCartModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('1 item no carrinho')).toBeInTheDocument();
  });

  it('should show clear cart and checkout buttons when items exist', () => {
    mockUseShoppingCart.mockReturnValue({
      ...mockUseShoppingCart(),
      cartItems: [
        {
          id: '1',
          title: 'Movie 1',
          imageURL: 'test1.jpg',
          price: '29.90',
          addedAt: new Date().toISOString(),
        },
      ],
      cartCount: 1,
    });

    render(<ShoppingCartModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText('Limpar Carrinho')).toBeInTheDocument();
    expect(screen.getByText('Finalizar Compra')).toBeInTheDocument();
  });

  it('should not show footer when cart is empty', () => {
    render(<ShoppingCartModal isOpen={true} onClose={mockOnClose} />);

    expect(screen.queryByText('Limpar Carrinho')).not.toBeInTheDocument();
    expect(screen.queryByText('Finalizar Compra')).not.toBeInTheDocument();
  });
});
