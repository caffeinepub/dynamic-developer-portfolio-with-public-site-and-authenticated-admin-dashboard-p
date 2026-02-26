import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export default function AccessDeniedScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-card p-8 text-center shadow-lg">
        <div className="flex justify-center">
          <ShieldAlert className="h-16 w-16 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground">
          You don't have permission to access the admin dashboard. Please contact the administrator if you believe this
          is an error.
        </p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}
