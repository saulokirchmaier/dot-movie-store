import { Heart, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import Magnet from '../ui/Magnet';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const IMAGE_BASE_URL =
  import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

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

  const fullImageURL = imageURL ? `${IMAGE_BASE_URL}/w500${imageURL}` : null;

  console.log(id);

  return (
    <Magnet padding={20} disabled={false} magnetStrength={50}>
      <div className="w-[260px] bg-gray-50 rounded-lg shadow-md hover:shadow-lg hover:shadow-green-300 hover:inset-shadow-sm transform hover:scale-102 transition-transform duration-300">
        <div className="w-full h-sm bg-gray-100 rounded-lg relative">
          {/* Imagem de placeholder/cover */}
          <div className="relative">
            <img
              src="/cover.png"
              alt="Loading..."
              className={`w-[300px] h-[340px] object-cover rounded-t-lg absolute top-0 left-0 transition-opacity duration-500 ${
                imageLoaded && !imageError ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {/* Loading overlay indicator */}
            {!imageLoaded && !imageError && fullImageURL && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-t-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700"></div>
              </div>
            )}
          </div>

          {/* Real image of the movie */}
          {fullImageURL && (
            <img
              src={fullImageURL}
              alt="Movie Poster"
              className={`w-[300px] h-[340px] object-cover rounded-t-lg transition-opacity duration-500 ${
                imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
          <Heart
            className="absolute top-2 right-2 cursor-pointer hover:scale-120 transition-transform"
            // fill="red"
            stroke="red"
            size={24}
          />
          <div className="absolute bottom-2 w-full flex justify-center">
            <p className="text-md text-white font-bold bg-gray-950/50 rounded-lg px-4 py-2">
              {date}
            </p>
          </div>
        </div>
        <div className="py-2 px-4 flex flex-col gap-1">
          {title.length > 20 ? (
            <Tooltip>
              <TooltipTrigger>
                <h2 className="text-lg font-bold text-gray-900">
                  {title.substring(0, 20)}...
                </h2>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900 text-white font-bold">
                <p>{title}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          )}
          <div className="flex items-center justify-evenly">
            <div className="flex items-center gap-2">
              <Star size={24} fill="#ffd700" stroke="#ffd700" />
              <p className="text-md text-gray-700 font-bold">{rating}</p>
            </div>
            <p className="text-sm text-gray-500">{genre}</p>
          </div>
          <div>
            <p className="text-md text-gray-500">R$ {price}</p>
          </div>
        </div>
        <Button className="w-full bg-emerald-700 hover:bg-emerald-500 transition-colors duration-300 cursor-pointer">
          <p className="text-md text-white font-bold">Adicionar</p>
        </Button>
      </div>
    </Magnet>
  );
};

export default MovieCard;
