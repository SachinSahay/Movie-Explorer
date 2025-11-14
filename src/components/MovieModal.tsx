import { Movie, MovieDetails } from '@/types/movie';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Play, Calendar, Clock, Users } from 'lucide-react';
import { genres } from '@/data/mockMovies';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  userRating?: number;
  onRatingChange?: (movieId: number, rating: number) => void;
}

export const MovieModal = ({ movie, isOpen, onClose, userRating, onRatingChange }: MovieModalProps) => {
  if (!movie) return null;

  const movieGenres = movie.genre_ids.map(id => genres.find(g => g.id === id)?.name).filter(Boolean);
  
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 cursor-pointer transition-colors ${
          i < (userRating || 0) 
            ? 'fill-cinema-gold text-cinema-gold' 
            : 'text-muted-foreground hover:text-cinema-gold'
        }`}
        onClick={() => onRatingChange?.(movie.id, i + 1)}
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-cinema-dark border-cinema-light">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">{movie.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Poster */}
          <div className="space-y-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-lg shadow-card-cinema"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
            
            {/* User Rating */}
            {onRatingChange && (
              <div className="bg-cinema-light rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-cinema-gold">Your Rating</h3>
                <div className="flex justify-center gap-1">
                  {renderStars()}
                </div>
                {userRating && userRating > 0 && (
                  <p className="text-center text-sm text-muted-foreground">
                    You rated this {userRating} star{userRating !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Movie Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="w-4 h-4 fill-cinema-gold text-cinema-gold" />
                <span className="text-cinema-gold font-semibold">{movie.vote_average.toFixed(1)}/10</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{movie.vote_count.toLocaleString()} votes</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-xs bg-cinema-gold text-cinema-darker px-2 py-1 rounded">
                  #{Math.floor(movie.popularity)}
                </span>
                <span>Popularity Rank</span>
              </div>
            </div>

            {/* Genres */}
            <div className="space-y-2">
              <h3 className="font-semibold text-cinema-gold">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movieGenres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="bg-cinema-light text-cinema-silver">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h3 className="font-semibold text-cinema-gold">Overview</h3>
              <p className="text-muted-foreground leading-relaxed">
                {movie.overview}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button className="bg-gradient-gold hover:bg-cinema-gold-dark text-cinema-darker font-semibold">
                <Play className="w-4 h-4 mr-2 fill-current" />
                Watch Trailer
              </Button>
              <Button variant="outline" className="border-cinema-light text-foreground hover:bg-cinema-light">
                Add to Watchlist
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};