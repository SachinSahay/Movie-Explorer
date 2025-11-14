import { Movie } from '@/types/movie';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Play } from 'lucide-react';
import { genres } from '@/data/mockMovies';

interface MovieCardProps {
  movie: Movie;
  onMovieClick: (movie: Movie) => void;
  userRating?: number;
  onRatingChange?: (movieId: number, rating: number) => void;
}

export const MovieCard = ({ movie, onMovieClick, userRating, onRatingChange }: MovieCardProps) => {
  const movieGenres = movie.genre_ids.map(id => genres.find(g => g.id === id)?.name).filter(Boolean);
  
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 cursor-pointer transition-colors ${
          i < (userRating || 0) 
            ? 'fill-cinema-gold text-cinema-gold' 
            : 'text-muted-foreground hover:text-cinema-gold'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onRatingChange?.(movie.id, i + 1);
        }}
      />
    ));
  };

  return (
    <Card 
      className="group relative overflow-hidden bg-gradient-card border-cinema-light hover:border-cinema-gold transition-all duration-300 cursor-pointer shadow-card-cinema hover:shadow-gold"
      onClick={() => onMovieClick(movie)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-cinema-gold/90 rounded-full p-3">
            <Play className="w-6 h-6 text-cinema-darker fill-current" />
          </div>
        </div>
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-cinema-darker/80 rounded-full px-2 py-1">
          <Star className="w-3 h-3 fill-cinema-gold text-cinema-gold" />
          <span className="text-xs text-cinema-silver font-medium">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-cinema-gold transition-colors line-clamp-1">
            {movie.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {new Date(movie.release_date).getFullYear()}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {movieGenres.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="secondary" className="text-xs bg-cinema-light text-cinema-silver">
              {genre}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {movie.overview}
        </p>

        {onRatingChange && (
          <div className="flex items-center gap-2 pt-2 border-t border-cinema-light">
            <span className="text-xs text-muted-foreground">Rate:</span>
            <div className="flex gap-1">
              {renderStars()}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};