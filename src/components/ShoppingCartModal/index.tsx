import { Modal } from '../ui/Modal';
import { useShoppingCart } from '@/contexts';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

interface ShoppingCartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShoppingCartModal({ isOpen, onClose }: ShoppingCartModalProps) {
  const { cartItems, removeFromCart, clearCart } = useShoppingCart();

  // Calcular total do carrinho
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
    <Modal isOpen={isOpen} onClose={onClose} title="Meu Carrinho">
      <div className="flex flex-col h-[calc(100vh-150px)] md:h-[calc(100vh-80px)]">
        {/* Scroll Area - Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart size={80} className="text-neutral-600 mb-4" />
              <h3 className="text-lg font-medium text-neutral-300 mb-2">
                Seu carrinho está vazio
              </h3>
              <p className="text-neutral-500 text-sm">
                Adicione filmes ao carrinho para começar sua compra
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors relative"
                >
                  {/* Movie Image */}
                  <div className="w-16 h-24 bg-neutral-600 rounded-md overflow-hidden flex-shrink-0">
                    {item.imageURL ? (
                      <img
                        src={item.imageURL}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-neutral-400 text-xs">
                          Sem imagem
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Movie Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-neutral-100">
                      {item.title}
                    </h4>
                    <p className="text-sm text-emerald-400 font-semibold">
                      R$ {item.price}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 rounded-full hover:bg-neutral-700 transition-colors cursor-pointer hover:scale-110 absolute right-2 top-2 text-neutral-400 hover:text-red-400"
                    aria-label={`Remover ${item.title} do carrinho`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Sempre Fixo */}
        {cartItems.length > 0 && (
          <div className="border-t border-neutral-700 p-6 bg-neutral-800 mt-auto">
            <div className="space-y-4">
              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-neutral-100">
                  Total:
                </span>
                <span className="text-xl font-bold text-emerald-400">
                  {formatPrice(total)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={clearCart}
                  variant="outline"
                  className="flex-1 px-4 py-2 text-sm text-red-400 border border-red-400 rounded-md bg-transparent hover:bg-red-400 hover:text-white transition-colors"
                >
                  Limpar Carrinho
                </Button>
                <Button
                  onClick={() => {
                    // TODO: Implementar checkout
                    console.log('Ir para checkout');
                    onClose();
                  }}
                  className="flex-1 px-4 py-2 text-sm bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
                >
                  Finalizar Compra
                </Button>
              </div>

              {/* Items Count */}
              <div className="text-center">
                <span className="text-sm text-neutral-400">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'}{' '}
                  no carrinho
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
