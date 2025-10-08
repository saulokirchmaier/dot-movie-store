import { Heart, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import Magnet from '../ui/Magnet';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useFavorites, useShoppingCart } from '@/contexts';

interface MovieCardProps {
  id: string;
  imageURL: string;
  title: string;
  genre: string;
  price: string;
  date: string;
  rating: number;
}

const MovieCard = ({
  id,
  imageURL,
  title,
  genre,
  price,
  date,
  rating,
}: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHeartHovered, setIsHeartHovered] = useState(false);

  const isMobile = useIsMobile();
  const valueCropTitle = isMobile ? 15 : 20;

  const { addToCart } = useShoppingCart();

  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(id);

  const handleFavoriteClick = () => {
    toggleFavorite({
      id,
      title,
      price,
      imageURL,
      addedAt: new Date().toISOString(),
    });
  };

  const handleAddToCartClick = () => {
    addToCart({
      id,
      title,
      price,
      imageURL,
      addedAt: new Date().toISOString(),
    });
  };

  return (
    <Magnet padding={20} disabled={false} magnetStrength={50}>
      <div className="w-[160px] md:w-[260px] bg-gray-50 rounded-lg shadow-md hover:shadow-lg hover:shadow-green-300 hover:inset-shadow-sm transform hover:scale-102 transition-transform duration-300">
        <div className="w-full h-sm bg-gray-100 rounded-lg relative">
          {/* Imagem de placeholder/cover */}
          <div className="relative">
            <img
              src="/cover.png"
              alt="Loading..."
              className={`w-[160px] md:w-[260px] h-[220px] md:h-[300px] object-cover rounded-t-lg absolute top-0 left-0 transition-opacity duration-500 ${
                imageLoaded && !imageError ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </div>

          {/* Real image of the movie */}
          {imageURL && (
            <img
              src={imageURL}
              alt="Movie Poster"
              className={`w-[160px] md:w-[260px] h-[220px] md:h-[300px] object-cover rounded-t-lg transition-opacity duration-500 ${
                imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
          <Heart
            className="absolute top-2 right-2 cursor-pointer hover:scale-120 transition-all duration-300"
            fill={favorited ? '#ff6b6b' : isHeartHovered ? '#ff6b6b75' : 'none'}
            stroke="red"
            size={24}
            onClick={handleFavoriteClick}
            onMouseEnter={() => setIsHeartHovered(true)}
            onMouseLeave={() => setIsHeartHovered(false)}
          />
          <div className="absolute bottom-2 w-full flex justify-center">
            <p className="text-xs md:text-md text-white font-bold bg-gray-950/50 rounded-lg px-4 py-2">
              {date}
            </p>
          </div>
        </div>
        <div className="py-2 px-2 md:px-4 flex flex-col gap-1">
          {title.length > valueCropTitle ? (
            <Tooltip>
              <TooltipTrigger>
                <h2 className="text-sm md:text-lg font-bold text-gray-900">
                  {title.substring(0, valueCropTitle)}...
                </h2>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900 text-white font-bold">
                <p>{title}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <h3 className="text-sm md:text-lg font-bold text-gray-900">
              {title}
            </h3>
          )}
          <div className="flex items-center justify-evenly">
            <div className="flex items-center gap-1 md:gap-2">
              <Star size={isMobile ? 18 : 24} fill="#ffd700" stroke="#ffd700" />
              <p className="text-sm md:text-md text-gray-700 font-bold">
                {rating}
              </p>
            </div>
            <p className="text-xs md:text-md text-gray-500">{genre}</p>
          </div>
          <div>
            <p className="text-sm md:text-md text-gray-500 font-bold">
              R$ {price}
            </p>
          </div>
        </div>
        <Button
          className="w-full bg-emerald-700 hover:bg-emerald-500 transition-colors duration-300 cursor-pointer"
          onClick={handleAddToCartClick}
        >
          <p className="text-md text-white font-bold">Adicionar</p>
        </Button>
      </div>
    </Magnet>
  );
};

export default MovieCard;
