import { ShoppingCart } from 'lucide-react';

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <ShoppingCart size={80} className="text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-600 mb-2">
        Seu carrinho está vazio
      </h3>
      <p className="text-gray-500 text-sm">
        Adicione filmes ao carrinho para começar sua compra
      </p>
    </div>
  );
}
