import { useState, useRef } from 'react';
import { useGetResume } from '../../hooks/usePortfolioQueries';
import { useAdminUploadResume } from '../../hooks/useAdminMutations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Loader2, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminResumePage() {
  const { data: resumeFile, isLoading: resumeLoading } = useGetResume();
  const { mutate: uploadResume, isPending } = useAdminUploadResume();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type (PDF minimum)
    if (file.type !== 'application/pdf') {
      toast.error('Please select a PDF file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    setUploadProgress(0);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    uploadResume(
      { 
        file: selectedFile, 
        onProgress: (percentage) => setUploadProgress(percentage) 
      },
      {
        onSuccess: () => {
          setSelectedFile(null);
          setUploadProgress(0);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        },
      }
    );
  };

  const handleDownloadCurrent = () => {
    if (resumeFile?.blob) {
      const url = resumeFile.blob.getDirectURL();
      const link = document.createElement('a');
      link.href = url;
      link.download = resumeFile.name || 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Resume Management</h1>
        <p className="text-muted-foreground">Upload and manage your resume file</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Resume</CardTitle>
            <CardDescription>The resume currently displayed on your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            {resumeLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : resumeFile ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg border p-4">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">{resumeFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Uploaded {new Date(Number(resumeFile.uploadedAt) / 1_000_000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button onClick={handleDownloadCurrent} variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Current Resume
                </Button>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">No resume uploaded yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload New Resume</CardTitle>
            <CardDescription>Replace your current resume with a new one (PDF only)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resume-file">Select PDF File</Label>
              <Input
                ref={fileInputRef}
                id="resume-file"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileSelect}
                disabled={isPending}
              />
              <p className="text-xs text-muted-foreground">Maximum file size: 10MB</p>
            </div>

            {selectedFile && (
              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
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
                  Upload Resume
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
