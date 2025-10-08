import Magnet from '../ui/Magnet';
import AnimatedContent from '../AnimatedContent';
import { MovieCardContent } from './MovieCardContent';

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
  return (
    <AnimatedContent
      distance={50}
      direction="vertical"
      reverse={false}
      duration={0.8}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      scale={0.9}
      threshold={0.2}
      delay={0.2}
    >
      <Magnet padding={20} disabled={false} magnetStrength={50}>
        <MovieCardContent
          id={id}
          imageURL={imageURL}
          title={title}
          genre={genre}
          price={price}
          date={date}
          rating={rating}
        />
      </Magnet>
    </AnimatedContent>
  );
};

export default MovieCard;
