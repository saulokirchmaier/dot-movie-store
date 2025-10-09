import { AnimatePresence } from 'framer-motion';
import { ModalMovieItem } from '../ui/ModalMovieItem';
import { useFavorites } from '@/contexts';

interface FavoritesListProps {
  onAnimationStart: () => void;
  onAnimationComplete: () => void;
}

export function FavoritesList({
  onAnimationStart,
  onAnimationComplete,
}: FavoritesListProps) {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="space-y-4">
      <AnimatePresence
        mode="popLayout"
        onExitComplete={() => {
          if (favorites.length === 0) {
            onAnimationComplete();
          }
        }}
      >
        {favorites.map((movie) => (
          <ModalMovieItem
            key={movie.id}
            id={movie.id}
            title={movie.title}
            imageURL={movie.imageURL || '/cover.png'}
            isFavoriteModal={true}
            price={movie.price}
            removeLabel="Remover dos favoritos"
            onRemove={(id) => {
              onAnimationStart();
              removeFavorite(id);
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
