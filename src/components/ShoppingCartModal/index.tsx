import { Modal } from '../ui/Modal';
import { EmptyState } from '../ui/EmptyState';
import { CartItemsList } from './CartItemsList';
import { CartFooter } from './CartFooter';
import { useShoppingCart } from '@/contexts';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface ShoppingCartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShoppingCartModal({ isOpen, onClose }: ShoppingCartModalProps) {
  const { cartItems } = useShoppingCart();
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Meu Carrinho">
      <div className="flex flex-col h-[calc(100vh-150px)] md:h-[calc(100vh-80px)]">
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 && !isAnimating ? (
            <EmptyState
              icon={ShoppingCart}
              title="Seu carrinho está vazio"
              description="Adicione filmes ao carrinho para começar sua compra"
            />
          ) : (
            <CartItemsList
              onAnimationStart={() => setIsAnimating(true)}
              onAnimationComplete={() => setIsAnimating(false)}
            />
          )}
        </div>

        <CartFooter />
      </div>
    </Modal>
  );
}
