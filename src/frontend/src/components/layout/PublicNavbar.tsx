import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DarkModeToggle from '../controls/DarkModeToggle';

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/skills', label: 'Skills' },
    { path: '/projects', label: 'Projects' },
    { path: '/experience', label: 'Experience' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Portfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentPath === link.path ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <DarkModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <DarkModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <div className="container space-y-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent ${
                  currentPath === link.path ? 'bg-accent text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
