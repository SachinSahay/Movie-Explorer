import { useState, useMemo } from 'react';
import { Movie } from '@/types/movie';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { MovieGrid } from '@/components/MovieGrid';
import { SearchBar } from '@/components/SearchBar';
import { MovieModal } from '@/components/MovieModal';
import { mockMovies, featuredMovie } from '@/data/mockMovies';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [userRatings, setUserRatings] = useState<Record<number, number>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const { toast } = useToast();

  // Filter movies based on search and genre
  const filteredMovies = useMemo(() => {
    let filtered = mockMovies;

    if (searchQuery) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.overview.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter(movie =>
        movie.genre_ids.includes(selectedGenre)
      );
    }

    return filtered;
  }, [searchQuery, selectedGenre]);

  // Sort movies by different criteria
  const popularMovies = [...mockMovies].sort((a, b) => b.popularity - a.popularity).slice(0, 6);
  const topRatedMovies = [...mockMovies].sort((a, b) => b.vote_average - a.vote_average).slice(0, 6);
  const recentMovies = [...mockMovies].sort((a, b) => 
    new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  ).slice(0, 6);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleRatingChange = (movieId: number, rating: number) => {
    setUserRatings(prev => ({ ...prev, [movieId]: rating }));
    const movie = mockMovies.find(m => m.id === movieId);
    toast({
      title: "Rating Added",
      description: `You rated "${movie?.title}" ${rating} star${rating !== 1 ? 's' : ''}`,
    });
  };

  const handleWatchTrailer = () => {
    if (featuredMovie.trailer) {
      window.open(`https://www.youtube.com/watch?v=${featuredMovie.trailer}`, '_blank');
    }
  };

  const handleMoreInfo = () => {
    setSelectedMovie(featuredMovie);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-16">
            <HeroSection 
              movie={featuredMovie}
              onWatchTrailer={handleWatchTrailer}
              onMoreInfo={handleMoreInfo}
            />
            
            <div className="container mx-auto px-6 space-y-16">
              <MovieGrid
                title="🔥 Popular This Week"
                movies={popularMovies}
                onMovieClick={handleMovieClick}
                userRatings={userRatings}
                onRatingChange={handleRatingChange}
                showRating={true}
              />
              
              <MovieGrid
                title="⭐ Top Rated"
                movies={topRatedMovies}
                onMovieClick={handleMovieClick}
                userRatings={userRatings}
                onRatingChange={handleRatingChange}
                showRating={true}
              />
              
              <MovieGrid
                title="🆕 Recently Released"
                movies={recentMovies}
                onMovieClick={handleMovieClick}
                userRatings={userRatings}
                onRatingChange={handleRatingChange}
                showRating={true}
              />
            </div>
          </div>
        );
        
      case 'trending':
        return (
          <div className="container mx-auto px-6 py-12">
            <MovieGrid
              title="📈 Trending Movies"
              movies={popularMovies}
              onMovieClick={handleMovieClick}
              userRatings={userRatings}
              onRatingChange={handleRatingChange}
              showRating={true}
            />
          </div>
        );
        
      case 'search':
        return (
          <div className="container mx-auto px-6 py-12 space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Discover Your Next Favorite Movie
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Search through thousands of movies and find exactly what you're looking for
              </p>
            </div>
            
            <SearchBar
              onSearch={setSearchQuery}
              onGenreFilter={setSelectedGenre}
              selectedGenre={selectedGenre}
            />
            
            {searchQuery || selectedGenre ? (
              <MovieGrid
                title={`Search Results (${filteredMovies.length} found)`}
                movies={filteredMovies}
                onMovieClick={handleMovieClick}
                userRatings={userRatings}
                onRatingChange={handleRatingChange}
                showRating={true}
              />
            ) : (
              <MovieGrid
                title="🎬 All Movies"
                movies={mockMovies}
                onMovieClick={handleMovieClick}
                userRatings={userRatings}
                onRatingChange={handleRatingChange}
                showRating={true}
              />
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main>
        {renderContent()}
      </main>

      <MovieModal
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
        userRating={selectedMovie ? userRatings[selectedMovie.id] : undefined}
        onRatingChange={handleRatingChange}
      />
    </div>
  );
};

export default Index;
