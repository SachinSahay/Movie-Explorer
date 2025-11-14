import { Movie } from '@/types/movie';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
  userRatings?: Record<number, number>;
  onRatingChange?: (movieId: number, rating: number) => void;
  showRating?: boolean;
}

export const MovieGrid = ({ 
  title, 
  movies, 
  onMovieClick, 
  userRatings, 
  onRatingChange, 
  showRating = false 
}: MovieGridProps) => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">
        {title}
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={onMovieClick}
            userRating={userRatings?.[movie.id]}
            onRatingChange={showRating ? onRatingChange : undefined}
          />
        ))}
      </div>
    </section>
  );
};