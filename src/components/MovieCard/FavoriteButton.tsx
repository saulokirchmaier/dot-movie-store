import { Heart } from 'lucide-react';
import { useState } from 'react';
import { useFavorites } from '@/contexts';
import { HeartBurst } from '../ui/HeartBurst';

interface FavoriteButtonProps {
  movieId: string;
  movieTitle: string;
  moviePrice: string;
  movieImageURL: string;
}

export function FavoriteButton({
  movieId,
  movieTitle,
  moviePrice,
  movieImageURL,
}: FavoriteButtonProps) {
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(movieId);

  const handleFavoriteClick = () => {
    const wasNotFavorited = !favorited;

    toggleFavorite({
      id: movieId,
      title: movieTitle,
      price: moviePrice,
      imageURL: movieImageURL,
      addedAt: new Date().toISOString(),
    });

    // Só anima quando ADICIONA ao favoritos
    if (wasNotFavorited) {
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 600);
    }
  };

  return (
    <div className="absolute top-2 right-2">
      <div className="relative">
        <Heart
          className="cursor-pointer hover:scale-120 transition-all duration-300"
          fill={favorited ? '#ff6b6b' : isHeartHovered ? '#ff6b6b75' : 'none'}
          stroke="red"
          size={24}
          onClick={handleFavoriteClick}
          onMouseEnter={() => setIsHeartHovered(true)}
          onMouseLeave={() => setIsHeartHovered(false)}
        />
        <HeartBurst isActive={showBurst} />
      </div>
    </div>
  );
}
