import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Mail } from 'lucide-react';
import TypingWord from '@/components/home/TypingWord';
import { useGetResume } from '../hooks/usePortfolioQueries';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function HomePage() {
  const typingWords = [
    'Developer',      // Web & software development
    'Designer',       // UI/UX / Creative design
    'Database',       // Data management / backend skill
    'Debugger',       // Problem-solving / code fixing
    'DevOps'          // Deployment & server automation
  ];

  const { data: resumeFile, isLoading: resumeLoading } = useGetResume();

  const handleResumeDownload = () => {
    if (resumeFile?.blob) {
      const url = resumeFile.blob.getDirectURL();
      const link = document.createElement('a');
      link.href = url;
      link.download = resumeFile.name || 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Fallback to static resume if no admin-uploaded resume exists
      const link = document.createElement('a');
      link.href = '/assets/resume.pdf';
      link.download = 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const isResumeAvailable = !resumeLoading && (resumeFile !== null || true); // Always available (fallback exists)

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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="w-full sm:w-auto">
                      <Button 
                        size="lg" 
                        variant="secondary" 
                        className="w-full sm:w-auto"
                        onClick={handleResumeDownload}
                        disabled={!isResumeAvailable}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Resume
                      </Button>
                    </span>
                  </TooltipTrigger>
                  {!isResumeAvailable && (
                    <TooltipContent>
                      <p>Resume not available</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
