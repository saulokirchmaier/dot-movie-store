import { Button } from '../ui/button';
import { useShoppingCart } from '@/contexts';
import { useNavigate } from '@tanstack/react-router';

export function CartFooter() {
  const { cartItems, clearCart } = useShoppingCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) return null;

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('R$', '').replace(',', '.'));
    return sum + price;
  }, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleCheckout = () => {
    navigate({ to: '/checkout' });
  };

  return (
    <div className="border-t border-neutral-700 p-6 bg-neutral-800 mt-auto">
      <div className="space-y-4">
        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-neutral-100">Total:</span>
          <span className="text-xl font-bold text-emerald-400">
            {formatPrice(total)}
          </span>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={clearCart}
            variant="outline"
            className="flex-1 px-4 py-2 text-sm text-red-400 border border-red-400 rounded-md bg-transparent hover:bg-red-400 hover:text-white transition-colors"
          >
            Limpar Carrinho
          </Button>
          <Button
            onClick={handleCheckout}
            className="flex-1 px-4 py-2 text-sm bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
          >
            Finalizar Compra
          </Button>
        </div>

        <div className="text-center">
          <span className="text-sm text-neutral-400">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} no
            carrinho
          </span>
        </div>
      </div>
    </div>
  );
}
