import { Link } from '@tanstack/react-router';
import { ArrowRight, Briefcase, Code, Megaphone, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetProjects } from '../hooks/usePortfolioQueries';
import ProjectCard from '../components/projects/ProjectCard';

export default function CreatePage() {
  const { data: projects, isLoading } = useGetProjects();

  // Featured projects - show up to 3 projects
  const featuredProjects = projects?.slice(0, 3) || [];

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies including React, TypeScript, and blockchain integration.',
    },
    {
      icon: Briefcase,
      title: 'Full Stack Solutions',
      description: 'End-to-end development from backend architecture to responsive frontend interfaces with seamless user experiences.',
    },
    {
      icon: Sparkles,
      title: 'Blockchain Development',
      description: 'Decentralized applications on the Internet Computer using Motoko and cutting-edge Web3 technologies.',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="secondary">
              Available for Projects
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Let's Build Something
              <span className="block text-primary">Amazing Together</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Transform your ideas into reality with professional web development services. From concept to deployment, I deliver high-quality solutions tailored to your needs.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link to="/projects">View All Projects</Link>
              </Button>
            </div>
          </div>
        </div>
        <div 
          className="absolute inset-0 -z-0" 
          style={{
            backgroundImage: 'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
      </section>

      {/* Services Section */}
      <section className="border-b border-border/40 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">What I Can Do For You</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Comprehensive development services to bring your vision to life with expertise and attention to detail.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="border-b border-border/40 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Featured Work</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              A selection of recent projects showcasing my skills and expertise in modern web development.
            </p>
          </div>
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="flex h-full flex-col">
                  <Skeleton className="aspect-video w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : featuredProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id.toString()} project={project} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border/40 bg-muted/20 p-12 text-center">
              <p className="text-muted-foreground">No projects available yet. Check back soon!</p>
            </div>
          )}
          {featuredProjects.length > 0 && (
            <div className="mt-12 text-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/projects">
                  View All Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-b border-border/40 bg-primary/5 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Your Project?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Let's discuss how I can help bring your ideas to life. Get in touch today for a free consultation.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">
                Contact Me Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Advertisements Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Sponsored Content</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Advertisement space available for partnerships and collaborations.
            </p>
          </div>
          <div className="space-y-8">
            {/* Banner Ad Placeholder */}
            <div className="mx-auto max-w-4xl">
              <Card className="overflow-hidden border-2 border-dashed border-border/60">
                <CardContent className="flex min-h-[200px] items-center justify-center bg-muted/30 p-8">
                  <div className="text-center">
                    <Megaphone className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                    <p className="text-lg font-medium text-muted-foreground">Banner Advertisement Space</p>
                    <p className="mt-2 text-sm text-muted-foreground/70">728 x 90 pixels</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Square Ad Placeholders */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="overflow-hidden border-2 border-dashed border-border/60">
                <CardContent className="flex min-h-[300px] items-center justify-center bg-muted/30 p-8">
                  <div className="text-center">
                    <Megaphone className="mx-auto mb-4 h-10 w-10 text-muted-foreground/50" />
                    <p className="font-medium text-muted-foreground">Square Ad Space</p>
                    <p className="mt-2 text-sm text-muted-foreground/70">300 x 250 pixels</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden border-2 border-dashed border-border/60">
                <CardContent className="flex min-h-[300px] items-center justify-center bg-muted/30 p-8">
                  <div className="text-center">
                    <Megaphone className="mx-auto mb-4 h-10 w-10 text-muted-foreground/50" />
                    <p className="font-medium text-muted-foreground">Square Ad Space</p>
                    <p className="mt-2 text-sm text-muted-foreground/70">300 x 250 pixels</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
