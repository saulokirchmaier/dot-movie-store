import { useShoppingCart } from '@/contexts';
import { Button } from '@/components/ui/button';
import { CartItem } from './CartItem';
import { AnimatePresence } from 'framer-motion';

export function OrderSummary() {
  const { cartItems } = useShoppingCart();

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
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Resumo do Pedido
        </h3>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}
        </h4>
      </div>

      <div className="mb-6 max-h-[420px] overflow-y-auto overflow-x-hidden">
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-3 mb-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total:</span>
          <span className="text-emerald-600">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          Finalizar
        </Button>
      </div>
    </div>
  );
}
