import { Modal } from '../ui/Modal';
import { EmptyState } from '../ui/EmptyState';
import { FavoritesList } from './FavoritesList';
import { FavoritesFooter } from './FavoritesFooter';
import { useFavorites } from '@/contexts';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const { favorites } = useFavorites();
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Meus Favoritos">
      <div className="flex flex-col h-[calc(100vh-80px)]">
        <div className="flex-1 overflow-y-auto p-6">
          {favorites.length === 0 && !isAnimating ? (
            <EmptyState
              icon={Heart}
              title="Nenhum favorito ainda"
              description="Adicione filmes aos seus favoritos para vê-los aqui"
            />
          ) : (
            <FavoritesList
              onAnimationStart={() => setIsAnimating(true)}
              onAnimationComplete={() => setIsAnimating(false)}
            />
          )}
        </div>

        <FavoritesFooter />
      </div>
    </Modal>
  );
}
