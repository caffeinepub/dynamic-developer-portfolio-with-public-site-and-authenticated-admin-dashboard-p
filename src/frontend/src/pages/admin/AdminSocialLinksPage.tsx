import { useState } from 'react';
import { useGetSocialLinks } from '../../hooks/usePortfolioQueries';
import { useCreateSocialLink, useUpdateSocialLink, useDeleteSocialLink } from '../../hooks/useAdminMutations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import type { SocialLink } from '../../backend';

export default function AdminSocialLinksPage() {
  const { data: socialLinks, isLoading } = useGetSocialLinks();
  const createMutation = useCreateSocialLink();
  const updateMutation = useUpdateSocialLink();
  const deleteMutation = useDeleteSocialLink();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [formData, setFormData] = useState({
    platform: '',
    url: '',
  });

  const resetForm = () => {
    setFormData({ platform: '', url: '' });
    setEditingLink(null);
  };

  const handleEdit = (link: SocialLink) => {
    setEditingLink(link);
    setFormData({
      platform: link.platform,
      url: link.url,
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const linkData: SocialLink = {
      id: editingLink?.id || BigInt(0),
      platform: formData.platform,
      url: formData.url,
    };

    if (editingLink) {
      updateMutation.mutate(
        { id: editingLink.id, socialLink: linkData },
        {
          onSuccess: () => {
            setDialogOpen(false);
            resetForm();
          },
        }
      );
    } else {
      createMutation.mutate(linkData, {
        onSuccess: () => {
          setDialogOpen(false);
          resetForm();
        },
      });
    }
  };

  const handleDelete = (id: bigint) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Social Links</h1>
          <p className="text-muted-foreground">Manage your social media links</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Link
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingLink ? 'Edit Social Link' : 'Add New Social Link'}</DialogTitle>
              <DialogDescription>Fill in the social link details below</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Input
                  id="platform"
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  placeholder="GitHub, LinkedIn, etc."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                  required
                />
              </div>
              <DialogFooter>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {(createMutation.isPending || updateMutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingLink ? 'Update' : 'Create'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : socialLinks && socialLinks.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {socialLinks.map((link) => (
                <TableRow key={Number(link.id)}>
                  <TableCell className="font-medium">{link.platform}</TableCell>
                  <TableCell className="max-w-md truncate">{link.url}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(link)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Social Link</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this link? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(link.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="rounded-md border p-12 text-center">
          <p className="text-muted-foreground">No social links yet. Add your first link!</p>
        </div>
      )}
    </div>
  );
}
