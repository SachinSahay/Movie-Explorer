import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Film, User, Search, Home, TrendingUp } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <nav className="bg-cinema-darker/95 backdrop-blur-sm border-b border-cinema-light sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-gold p-1 rounded-lg flex items-center justify-center">
              {/* use movie-logo.svg from public folder */}
              <img src="/movie-logo.svg" alt="CineSuggest logo" className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold text-foreground">
              Cine<span className="text-cinema-gold">Suggest</span>
            </h1>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-6">
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              onClick={() => onTabChange('home')}
              className={activeTab === 'home' 
                ? 'bg-cinema-gold text-cinema-darker hover:bg-cinema-gold-dark' 
                : 'text-muted-foreground hover:text-foreground hover:bg-cinema-light'
              }
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button
              variant={activeTab === 'trending' ? 'default' : 'ghost'}
              onClick={() => onTabChange('trending')}
              className={activeTab === 'trending' 
                ? 'bg-cinema-gold text-cinema-darker hover:bg-cinema-gold-dark' 
                : 'text-muted-foreground hover:text-foreground hover:bg-cinema-light'
              }
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </Button>
            <Button
              variant={activeTab === 'search' ? 'default' : 'ghost'}
              onClick={() => onTabChange('search')}
              className={activeTab === 'search' 
                ? 'bg-cinema-gold text-cinema-darker hover:bg-cinema-gold-dark' 
                : 'text-muted-foreground hover:text-foreground hover:bg-cinema-light'
              }
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-cinema-light text-foreground hover:bg-cinema-light"
            >
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-center gap-4 mt-4 pt-4 border-t border-cinema-light">
          <Button
            variant={activeTab === 'home' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onTabChange('home')}
            className={activeTab === 'home' 
              ? 'bg-cinema-gold text-cinema-darker' 
              : 'text-muted-foreground hover:text-foreground'
            }
          >
            <Home className="w-4 h-4" />
          </Button>
          <Button
            variant={activeTab === 'trending' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onTabChange('trending')}
            className={activeTab === 'trending' 
              ? 'bg-cinema-gold text-cinema-darker' 
              : 'text-muted-foreground hover:text-foreground'
            }
          >
            <TrendingUp className="w-4 h-4" />
          </Button>
          <Button
            variant={activeTab === 'search' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onTabChange('search')}
            className={activeTab === 'search' 
              ? 'bg-cinema-gold text-cinema-darker' 
              : 'text-muted-foreground hover:text-foreground'
            }
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};