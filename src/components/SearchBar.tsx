import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { genres } from '@/data/mockMovies';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onGenreFilter: (genreId: number | null) => void;
  selectedGenre: number | null;
}

export const SearchBar = ({ onSearch, onGenreFilter, selectedGenre }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const selectedGenreName = selectedGenre ? genres.find(g => g.id === selectedGenre)?.name : 'All Genres';

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4 py-3 bg-cinema-light border-cinema-light text-foreground placeholder:text-muted-foreground focus:border-cinema-gold focus:ring-cinema-gold"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="px-4 py-3 bg-cinema-light border-cinema-light text-foreground hover:bg-cinema-gold hover:text-cinema-darker min-w-fit"
            >
              <Filter className="w-4 h-4 mr-2" />
              {selectedGenreName}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-cinema-light border-cinema-light">
            <DropdownMenuItem 
              onClick={() => onGenreFilter(null)}
              className="text-foreground hover:bg-cinema-gold hover:text-cinema-darker"
            >
              All Genres
            </DropdownMenuItem>
            {genres.map((genre) => (
              <DropdownMenuItem
                key={genre.id}
                onClick={() => onGenreFilter(genre.id)}
                className="text-foreground hover:bg-cinema-gold hover:text-cinema-darker"
              >
                {genre.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          type="submit"
          className="px-6 py-3 bg-gradient-gold hover:bg-cinema-gold-dark text-cinema-darker font-semibold"
        >
          Search
        </Button>
      </form>
    </div>
  );
};