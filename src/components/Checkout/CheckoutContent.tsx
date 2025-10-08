import { useShoppingCart } from '@/contexts';
import { EmptyCart } from './EmptyCart';
import { CheckoutForm } from './CheckoutForm';

export function CheckoutContent() {
  const { cartItems } = useShoppingCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return <CheckoutForm />;
}
