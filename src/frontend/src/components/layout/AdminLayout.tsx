import { Outlet, Link, useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAdminGuard } from '../../hooks/useAdminGuard';
import { useAdminSession } from '../../hooks/useAdminSession';
import AdminEmailLoginForm from '../auth/AdminEmailLoginForm';
import DarkModeToggle from '../controls/DarkModeToggle';
import { LayoutDashboard, FolderKanban, Lightbulb, User, Briefcase, Link as LinkIcon, Mail, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { setIntendedAdminPath, clearIntendedAdminPath } from '../../utils/adminRedirect';

export default function AdminLayout() {
  const { isAuthenticated, isLoading } = useAdminGuard();
  const { logout } = useAdminSession();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Store intended path when user tries to access admin area while unauthenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated && currentPath.startsWith('/admin')) {
      setIntendedAdminPath(currentPath);
    }
  }, [isAuthenticated, isLoading, currentPath]);

  // Clear intended path when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      clearIntendedAdminPath();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminEmailLoginForm />;
  }

  const adminLinks = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/projects', label: 'Projects', icon: FolderKanban },
    { path: '/admin/skills', label: 'Skills', icon: Lightbulb },
    { path: '/admin/about', label: 'About', icon: User },
    { path: '/admin/experience', label: 'Experience', icon: Briefcase },
    { path: '/admin/social-links', label: 'Social Links', icon: LinkIcon },
    { path: '/admin/messages', label: 'Messages', icon: Mail },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">Admin Panel</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                View Site
              </Button>
            </Link>
            <DarkModeToggle />
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/30 lg:block">
          <nav className="space-y-1 p-4">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPath === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
