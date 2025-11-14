import { MovieDetails } from '@/types/movie';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Info, Star } from 'lucide-react';
import heroImage from '@/assets/hero-cinema.jpg';

interface HeroSectionProps {
  movie: MovieDetails;
  onWatchTrailer: () => void;
  onMoreInfo: () => void;
}

export const HeroSection = ({ movie, onWatchTrailer, onMoreInfo }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(90deg, hsl(var(--cinema-darker)) 0%, transparent 50%), url(${heroImage})`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-2xl space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-xl text-cinema-gold font-medium italic">
                "{movie.tagline}"
              </p>
            )}
          </div>

          {/* Movie Info */}
          <div className="flex items-center gap-4 text-sm text-cinema-silver">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-cinema-gold text-cinema-gold" />
              <span className="font-semibold text-cinema-gold">{movie.vote_average.toFixed(1)}</span>
              <span>({movie.vote_count.toLocaleString()} votes)</span>
            </div>
            <span>•</span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>•</span>
            <span>{movie.runtime} min</span>
          </div>

          {/* Genres */}
          <div className="flex gap-2">
            {movie.genres.map((genre) => (
              <Badge key={genre.id} variant="secondary" className="bg-cinema-light text-cinema-silver border-cinema-light">
                {genre.name}
              </Badge>
            ))}
          </div>

          {/* Overview */}
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            {movie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button 
              onClick={onWatchTrailer}
              size="lg"
              className="bg-gradient-gold hover:bg-cinema-gold-dark text-cinema-darker font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-gold hover:shadow-cinema"
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              Watch Trailer
            </Button>
            <Button 
              onClick={onMoreInfo}
              variant="outline"
              size="lg"
              className="border-cinema-light text-foreground hover:bg-cinema-light hover:text-foreground px-8 py-3 rounded-lg transition-all duration-300"
            >
              <Info className="w-5 h-5 mr-2" />
              More Info
            </Button>
          </div>

          {/* Cast Preview */}
          <div className="pt-6">
            <h3 className="text-sm font-semibold text-cinema-gold mb-3">STARRING</h3>
            <div className="flex gap-4">
              {movie.cast.slice(0, 4).map((actor) => (
                <div key={actor.id} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-cinema-light mb-2 overflow-hidden">
                    <img 
                      src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : '/placeholder.svg'}
                      alt={actor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <p className="text-xs text-cinema-silver font-medium">{actor.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};