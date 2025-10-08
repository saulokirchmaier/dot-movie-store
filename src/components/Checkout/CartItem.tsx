import type { CartMovie } from '@/contexts';
import { useShoppingCart } from '@/contexts';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartMovie;
}

export function CartItem({ item }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();

  return (
    <div className="flex gap-3 p-2 bg-gray-50 rounded-md relative group">
      <div className="w-12 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
        {item.imageURL ? (
          <img
            src={item.imageURL}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src="/cover.png"
            alt={item.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="flex-1 min-w-0 pr-4">
        <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
        <p className="text-xs text-emerald-600 font-semibold">
          R$ {item.price}
        </p>
      </div>

      <button
        type="button"
        onClick={() => removeFromCart(item.id)}
        className="absolute right-2 top-2 p-2 rounded-full hover:bg-gray-200 text-gray-400 hover:text-red-400 transition-colors"
        aria-label={`Remover ${item.title}`}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
