import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

export default function ScanPage() {
  const navigate = useNavigate();
  const portfolioUrl = 'https://dynamic-developer-portfolio-with-public-site-and-a-w6e.caffeine.xyz/';

  useEffect(() => {
    // Redirect immediately on mount
    window.location.replace(portfolioUrl);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="text-center space-y-4 p-8">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <h1 className="text-2xl font-semibold text-foreground">Redirecting to portfolio…</h1>
        <p className="text-muted-foreground">Please wait while we take you there.</p>
      </div>
    </div>
  );
}
