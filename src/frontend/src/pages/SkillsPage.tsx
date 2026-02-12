import { useGetSkills } from '../hooks/usePortfolioQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SkillsPage() {
  const { data: skills, isLoading } = useGetSkills();

  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const categoryOrder = ['Backend Skills', 'Frontend Skills', 'Deployment & Tools'];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Skills & Expertise</h1>
          <div className="mx-auto h-1 w-20 rounded-full bg-primary"></div>
          <p className="mt-4 text-lg text-muted-foreground">Technologies and tools I work with</p>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categoryOrder.map((category) => {
              const categorySkills = groupedSkills?.[category] || [];
              if (categorySkills.length === 0) return null;

              return (
                <Card key={category} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categorySkills.map((skill) => (
                        <div key={Number(skill.id)} className="flex items-center justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="secondary">{skill.level}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
