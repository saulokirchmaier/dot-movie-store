import { MovieImage } from './MovieImage';
import { MovieInfo } from './MovieInfo';
import { AddToCartButton } from './AddToCartButton';

interface MovieCardContentProps {
  id: string;
  imageURL: string;
  title: string;
  genre: string;
  price: string;
  date: string;
  rating: number;
}

export function MovieCardContent({
  id,
  imageURL,
  title,
  genre,
  price,
  date,
  rating,
}: MovieCardContentProps) {
  return (
    <div className="w-[160px] md:w-[260px] bg-gray-50 rounded-lg shadow-md hover:shadow-lg hover:shadow-green-300 hover:inset-shadow-sm transform hover:scale-102 transition-transform duration-300">
      <MovieImage
        movieId={id}
        movieTitle={title}
        moviePrice={price}
        imageURL={imageURL}
        date={date}
      />

      <MovieInfo title={title} rating={rating} genre={genre} price={price} />

      <AddToCartButton
        movieId={id}
        movieTitle={title}
        moviePrice={price}
        movieImageURL={imageURL}
      />
    </div>
  );
}
