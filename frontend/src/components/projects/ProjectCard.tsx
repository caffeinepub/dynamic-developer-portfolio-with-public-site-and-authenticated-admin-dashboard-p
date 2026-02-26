import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Project } from '../../backend';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasLiveDemo = project.liveDemoUrl && project.liveDemoUrl.trim() !== '';
  const hasGithub = project.githubUrl && project.githubUrl.trim() !== '';
  const hasImage = project.image && project.image.url && project.image.url.trim() !== '';

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
      {hasImage && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={project.image.url}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-1">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <Badge key={index} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        {hasLiveDemo && (
          <Button asChild size="sm" className="flex-1">
            <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
        )}
        {hasGithub && (
          <Button asChild variant="outline" size="sm" className="flex-1">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
