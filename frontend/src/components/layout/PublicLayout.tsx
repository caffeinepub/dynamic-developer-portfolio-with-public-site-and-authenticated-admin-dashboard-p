import { Outlet } from '@tanstack/react-router';
import PublicNavbar from './PublicNavbar';
import Footer from './Footer';
import SeoHeadManager from '../../seo/SeoHeadManager';

export default function PublicLayout() {
  return (
    <>
      <SeoHeadManager />
      <div className="flex min-h-screen flex-col">
        <PublicNavbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
