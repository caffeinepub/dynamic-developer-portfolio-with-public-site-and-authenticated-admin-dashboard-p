import { useState, useEffect } from 'react';
import { useGetAbout } from '../../hooks/usePortfolioQueries';
import { useUpdateAbout } from '../../hooks/useAdminMutations';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Save } from 'lucide-react';

export default function AdminAboutPage() {
  const { data: about, isLoading } = useGetAbout();
  const updateMutation = useUpdateAbout();
  const [content, setContent] = useState('');

  useEffect(() => {
    if (about) {
      setContent(about.content);
    }
  }, [about]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(content);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About Content</h1>
        <p className="text-muted-foreground">Edit your about section content</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Section</CardTitle>
          <CardDescription>This content will be displayed on your About page</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  placeholder="Write about yourself..."
                  required
                />
              </div>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
