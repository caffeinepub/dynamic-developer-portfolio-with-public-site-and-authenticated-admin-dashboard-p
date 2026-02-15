import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';
import AdminSkillsPage from './pages/admin/AdminSkillsPage';
import AdminAboutPage from './pages/admin/AdminAboutPage';
import AdminExperiencePage from './pages/admin/AdminExperiencePage';
import AdminSocialLinksPage from './pages/admin/AdminSocialLinksPage';
import AdminMessagesPage from './pages/admin/AdminMessagesPage';
import AdminResumePage from './pages/admin/AdminResumePage';
import AdminAvatarPage from './pages/admin/AdminAvatarPage';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import { useInitializeSeed } from './hooks/useInitializeSeed';

function RootComponent() {
  useInitializeSeed();
  return <Outlet />;
}

const rootRoute = createRootRoute({
  component: RootComponent,
});

const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public',
  component: PublicLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/',
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/about',
  component: AboutPage,
});

const skillsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/skills',
  component: SkillsPage,
});

const projectsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/projects',
  component: ProjectsPage,
});

const experienceRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/experience',
  component: ExperiencePage,
});

const contactRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/contact',
  component: ContactPage,
});

const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminLayout,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/',
  component: AdminDashboardPage,
});

const adminProjectsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/projects',
  component: AdminProjectsPage,
});

const adminSkillsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/skills',
  component: AdminSkillsPage,
});

const adminAboutRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/about',
  component: AdminAboutPage,
});

const adminExperienceRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/experience',
  component: AdminExperiencePage,
});

const adminSocialLinksRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/social-links',
  component: AdminSocialLinksPage,
});

const adminMessagesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/messages',
  component: AdminMessagesPage,
});

const adminResumeRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/resume',
  component: AdminResumePage,
});

const adminAvatarRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/avatar',
  component: AdminAvatarPage,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    homeRoute,
    aboutRoute,
    skillsRoute,
    projectsRoute,
    experienceRoute,
    contactRoute,
  ]),
  adminLayoutRoute.addChildren([
    adminDashboardRoute,
    adminProjectsRoute,
    adminSkillsRoute,
    adminAboutRoute,
    adminExperienceRoute,
    adminSocialLinksRoute,
    adminMessagesRoute,
    adminResumeRoute,
    adminAvatarRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
