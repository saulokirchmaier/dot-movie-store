import { useState } from 'react';
import { FavoriteButton } from './FavoriteButton';

interface MovieImageProps {
  movieId: string;
  movieTitle: string;
  moviePrice: string;
  imageURL: string;
  date: string;
}

export function MovieImage({
  movieId,
  movieTitle,
  moviePrice,
  imageURL,
  date,
}: MovieImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
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

      <FavoriteButton
        movieId={movieId}
        movieTitle={movieTitle}
        moviePrice={moviePrice}
        movieImageURL={imageURL}
      />

      <div className="absolute bottom-2 w-full flex justify-center">
        <p className="text-xs md:text-md text-white font-bold bg-gray-950/50 rounded-lg px-4 py-2">
          {date}
        </p>
      </div>
    </div>
  );
}
