import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cinema-darker to-cinema-dark flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-cinema-darker border-cinema-light">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-cinema-light">
            Log in to your Movie Explorer account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-cinema-light/10 border-cinema-light text-foreground placeholder:text-muted-foreground"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-cinema-light/10 border-cinema-light text-foreground placeholder:text-muted-foreground"
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-cinema-gold hover:bg-cinema-gold-dark text-cinema-darker font-semibold"
              disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : 'Log In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-cinema-light">
              Don't have an account?{' '}
              <Link to="/signup" className="text-cinema-gold hover:text-cinema-gold-dark font-semibold">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Demo credentials hint */}
          <div className="mt-6 p-3 bg-cinema-light/5 rounded-lg border border-cinema-light/20">
            <p className="text-xs text-cinema-light">
              <strong>Demo:</strong> Use email: <span className="text-cinema-gold">demo@test.com</span> and password: <span className="text-cinema-gold">demo123</span> after signing up
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogIn;
