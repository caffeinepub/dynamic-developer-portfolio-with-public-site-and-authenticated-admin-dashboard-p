import { useState } from 'react';
import { useGetSocialLinks } from '../hooks/usePortfolioQueries';
import { useContactSubmission } from '../hooks/useContactSubmission';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Send, Loader2 } from 'lucide-react';
import { SiGithub, SiLinkedin } from 'react-icons/si';

export default function ContactPage() {
  const { data: socialLinks } = useGetSocialLinks();
  const { mutate: submitMessage, isPending } = useContactSubmission();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    submitMessage(formData, {
      onSuccess: () => {
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
      },
    });
  };

  const getSocialIcon = (platform: string) => {
    const lower = platform.toLowerCase();
    if (lower.includes('github')) return <SiGithub className="h-5 w-5" />;
    if (lower.includes('linkedin')) return <SiLinkedin className="h-5 w-5" />;
    return <Mail className="h-5 w-5" />;
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Get In Touch</h1>
          <div className="mx-auto h-1 w-20 rounded-full bg-primary"></div>
          <p className="mt-4 text-lg text-muted-foreground">Let's discuss your next project</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>Fill out the form below and I'll get back to you soon.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    rows={6}
                    className={errors.message ? 'border-destructive' : ''}
                  />
                  {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
                <CardDescription>Find me on social media and professional networks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {socialLinks && socialLinks.length > 0 ? (
                  socialLinks.map((link) => (
                    <a
                      key={Number(link.id)}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border p-4 transition-all hover:bg-accent hover:shadow-sm"
                    >
                      {getSocialIcon(link.platform)}
                      <span className="font-medium">{link.platform}</span>
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No social links available yet.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Direct Email</CardTitle>
                <CardDescription>Prefer email? Reach out directly</CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:contact@example.com"
                  className="flex items-center gap-3 rounded-lg border p-4 transition-all hover:bg-accent hover:shadow-sm"
                >
                  <Mail className="h-5 w-5" />
                  <span className="font-medium">contact@example.com</span>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
