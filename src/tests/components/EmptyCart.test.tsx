import { describe, it, expect } from 'vitest';
import { render, screen } from '../utils/test-utils';
import { EmptyCart } from '@/components/Checkout/EmptyCart';

describe('EmptyCart', () => {
  it('should render empty cart message', () => {
    render(<EmptyCart />);

    expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument();
  });

  it('should render shopping cart icon', () => {
    const { container } = render(<EmptyCart />);

    // Check for SVG icon
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('should have correct styling classes', () => {
    const { container } = render(<EmptyCart />);

    const emptyCartContainer = container.querySelector(
      '.flex.flex-col.items-center'
    );
    expect(emptyCartContainer).toBeInTheDocument();
  });

  it('should display text in gray color', () => {
    render(<EmptyCart />);

    const message = screen.getByText('Seu carrinho está vazio');
    expect(message).toHaveClass('text-gray-600');
  });
});
