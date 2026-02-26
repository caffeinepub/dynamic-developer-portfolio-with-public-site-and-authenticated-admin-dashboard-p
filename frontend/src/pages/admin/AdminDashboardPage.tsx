import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderKanban, Lightbulb, User, Briefcase, Link as LinkIcon, Mail, FileText, Image } from 'lucide-react';

export default function AdminDashboardPage() {
  const adminSections = [
    {
      title: 'Projects',
      description: 'Manage your portfolio projects',
      icon: FolderKanban,
      path: '/admin/projects',
      color: 'text-blue-500',
    },
    {
      title: 'Skills',
      description: 'Update your skills and expertise',
      icon: Lightbulb,
      path: '/admin/skills',
      color: 'text-yellow-500',
    },
    {
      title: 'About',
      description: 'Edit your about section',
      icon: User,
      path: '/admin/about',
      color: 'text-green-500',
    },
    {
      title: 'Experience',
      description: 'Manage your work experience',
      icon: Briefcase,
      path: '/admin/experience',
      color: 'text-purple-500',
    },
    {
      title: 'Social Links',
      description: 'Update your social media links',
      icon: LinkIcon,
      path: '/admin/social-links',
      color: 'text-pink-500',
    },
    {
      title: 'Messages',
      description: 'View contact form submissions',
      icon: Mail,
      path: '/admin/messages',
      color: 'text-red-500',
    },
    {
      title: 'Resume',
      description: 'Upload and manage your resume',
      icon: FileText,
      path: '/admin/resume',
      color: 'text-orange-500',
    },
    {
      title: 'Avatar',
      description: 'Update your profile avatar',
      icon: Image,
      path: '/admin/avatar',
      color: 'text-cyan-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your portfolio content</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adminSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.path} to={section.path}>
              <Card className="transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon className={`h-8 w-8 ${section.color}`} />
                    <div>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
