import { useGetExperiences } from '../hooks/usePortfolioQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export default function ExperiencePage() {
  const { data: experiences, isLoading } = useGetExperiences();

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Experience</h1>
          <div className="mx-auto h-1 w-20 rounded-full bg-primary"></div>
          <p className="mt-4 text-lg text-muted-foreground">My professional journey</p>
        </div>

        <div className="mx-auto max-w-3xl">
          {isLoading ? (
            <div className="space-y-8">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : experiences && experiences.length > 0 ? (
            <div className="relative space-y-8 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-border">
              {experiences.map((exp) => (
                <div key={Number(exp.id)} className="relative pl-8">
                  <div className="absolute left-0 top-1 -translate-x-1/2 rounded-full bg-primary p-1.5">
                    <Briefcase className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                    <h3 className="mb-2 text-xl font-semibold">{exp.title}</h3>
                    <div className="mb-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {exp.company}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-12 text-center">
              <p className="text-muted-foreground">No experience entries available yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
