import { useGetAbout } from '../hooks/usePortfolioQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function AboutPage() {
  const { data: about, isLoading } = useGetAbout();

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">About Me</h1>
            <div className="mx-auto h-1 w-20 rounded-full bg-primary"></div>
          </div>

          <div className="grid gap-12 md:grid-cols-[300px_1fr] md:gap-16">
            <div className="flex justify-center md:justify-start">
              <div className="relative h-64 w-64 overflow-hidden rounded-2xl border-4 border-primary/20 shadow-xl">
                <img
                  src="/assets/generated/avatar.dim_512x512.png"
                  alt="Developer Avatar"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {about?.content ||
                    'I am a passionate Full-Stack Developer specializing in Laravel backend development and Vue.js frontend development. I enjoy building scalable applications, solving complex problems, and delivering clean, optimized, and secure solutions.'}
                </p>
              )}

              <div className="grid gap-4 pt-6 sm:grid-cols-2">
                <div className="rounded-lg border bg-card p-4">
                  <h3 className="mb-2 font-semibold text-primary">Experience</h3>
                  <p className="text-sm text-muted-foreground">3.5 Years Professional</p>
                </div>
                <div className="rounded-lg border bg-card p-4">
                  <h3 className="mb-2 font-semibold text-primary">Focus</h3>
                  <p className="text-sm text-muted-foreground">Full-Stack Development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
