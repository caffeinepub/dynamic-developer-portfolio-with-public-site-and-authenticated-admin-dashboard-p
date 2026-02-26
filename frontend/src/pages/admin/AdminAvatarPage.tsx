import { useState, useRef } from 'react';
import { useGetAvatar } from '../../hooks/usePortfolioQueries';
import { useAdminUploadAvatar } from '../../hooks/useAdminMutations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminAvatarPage() {
  const { data: avatarFile, isLoading: avatarLoading } = useGetAvatar();
  const { mutate: uploadAvatar, isPending } = useAdminUploadAvatar();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type (PNG/JPEG minimum)
    if (!file.type.match(/^image\/(png|jpeg|jpg)$/)) {
      toast.error('Please select a PNG or JPEG image');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
    setUploadProgress(0);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    uploadAvatar(
      { 
        file: selectedFile, 
        onProgress: (percentage) => setUploadProgress(percentage) 
      },
      {
        onSuccess: () => {
          setSelectedFile(null);
          setPreviewUrl(null);
          setUploadProgress(0);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        },
      }
    );
  };

  const currentAvatarUrl = avatarFile?.blob ? avatarFile.blob.getDirectURL() : '/assets/generated/avatar.dim_512x512.png';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Avatar Management</h1>
        <p className="text-muted-foreground">Upload and manage your profile avatar</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Avatar</CardTitle>
            <CardDescription>The avatar currently displayed on your About page</CardDescription>
          </CardHeader>
          <CardContent>
            {avatarLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="relative h-48 w-48 overflow-hidden rounded-2xl border-4 border-primary/20 shadow-lg">
                    <img
                      src={currentAvatarUrl}
                      alt="Current Avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                {avatarFile && (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Uploaded {new Date(Number(avatarFile.uploadedAt) / 1_000_000).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload New Avatar</CardTitle>
            <CardDescription>Replace your current avatar with a new image (PNG or JPEG)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="avatar-file">Select Image File</Label>
              <Input
                ref={fileInputRef}
                id="avatar-file"
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleFileSelect}
                disabled={isPending}
              />
              <p className="text-xs text-muted-foreground">Maximum file size: 5MB</p>
            </div>

            {previewUrl && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="flex justify-center rounded-lg border bg-muted/50 p-4">
                  <div className="relative h-32 w-32 overflow-hidden rounded-xl border-2 border-primary/20">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                {selectedFile && (
                  <p className="text-center text-xs text-muted-foreground">
                    {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
            )}

            {isPending && uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Uploading...</span>
                  <span className="font-medium">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isPending}
              className="w-full"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Avatar
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
