import { AnimatePresence } from 'framer-motion';
import { ModalMovieItem } from '../ui/ModalMovieItem';
import { useShoppingCart } from '@/contexts';

interface CartItemsListProps {
  onAnimationStart: () => void;
  onAnimationComplete: () => void;
}

export function CartItemsList({
  onAnimationStart,
  onAnimationComplete,
}: CartItemsListProps) {
  const { cartItems, removeFromCart } = useShoppingCart();

  return (
    <div className="space-y-4">
      <AnimatePresence
        mode="popLayout"
        onExitComplete={() => {
          if (cartItems.length === 0) {
            onAnimationComplete();
          }
        }}
      >
        {cartItems.map((item) => (
          <ModalMovieItem
            key={item.id}
            id={item.id}
            title={item.title}
            imageURL={item.imageURL || '/cover.png'}
            price={item.price}
            isFavoriteModal={false}
            removeLabel="Remover do carrinho"
            onRemove={(id) => {
              onAnimationStart();
              removeFromCart(id);
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
