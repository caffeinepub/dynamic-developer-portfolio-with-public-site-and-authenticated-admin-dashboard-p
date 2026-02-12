import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Mail } from 'lucide-react';
import TypingWord from '@/components/home/TypingWord';

export default function HomePage() {
  const typingWords = [
    'Developer',      // Web & software development
    'Designer',       // UI/UX / Creative design
    'Database',       // Data management / backend skill
    'Debugger',       // Problem-solving / code fixing
    'DevOps'          // Deployment & server automation
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-5"
          style={{ backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)' }}
        />
        <div className="container relative py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Full-Stack <TypingWord words={typingWords} />
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              I'm a Full-Stack Developer with 3.5 years of experience in PHP, Laravel, Vue.js, APIs, and server
              deployment. I focus on building efficient and scalable web solutions. Let's connect!
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/projects">
                <Button size="lg" className="w-full sm:w-auto">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </Button>
              </Link>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
                <a href="/assets/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            <Link to="/about" className="group">
              <div className="rounded-lg border bg-card p-6 transition-all hover:shadow-md">
                <h3 className="mb-2 text-xl font-semibold group-hover:text-primary">About Me</h3>
                <p className="text-sm text-muted-foreground">Learn more about my background and expertise</p>
              </div>
            </Link>
            <Link to="/skills" className="group">
              <div className="rounded-lg border bg-card p-6 transition-all hover:shadow-md">
                <h3 className="mb-2 text-xl font-semibold group-hover:text-primary">Skills</h3>
                <p className="text-sm text-muted-foreground">Explore my technical skills and proficiencies</p>
              </div>
            </Link>
            <Link to="/experience" className="group">
              <div className="rounded-lg border bg-card p-6 transition-all hover:shadow-md">
                <h3 className="mb-2 text-xl font-semibold group-hover:text-primary">Experience</h3>
                <p className="text-sm text-muted-foreground">View my professional journey and achievements</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
