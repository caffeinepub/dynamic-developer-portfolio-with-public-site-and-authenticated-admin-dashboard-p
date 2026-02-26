import { useGetProjects } from '../hooks/usePortfolioQueries';
import ProjectCard from '../components/projects/ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProjectsPage() {
  const { data: projects, isLoading } = useGetProjects();

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Projects</h1>
          <div className="mx-auto h-1 w-20 rounded-full bg-primary"></div>
          <p className="mt-4 text-lg text-muted-foreground">Explore my recent work and contributions</p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={Number(project.id)} project={project} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-12 text-center">
            <p className="text-muted-foreground">No projects available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
