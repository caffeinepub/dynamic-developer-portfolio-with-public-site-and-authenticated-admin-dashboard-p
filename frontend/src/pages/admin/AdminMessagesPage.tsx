import { useGetContactMessages } from '../../hooks/useAdminQueries';
import { useMarkMessageAsRead, useDeleteContactMessage } from '../../hooks/useAdminMutations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { Mail, MailOpen, Trash2 } from 'lucide-react';

export default function AdminMessagesPage() {
  const { data: messages, isLoading } = useGetContactMessages();
  const markAsReadMutation = useMarkMessageAsRead();
  const deleteMutation = useDeleteContactMessage();

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleMarkAsRead = (id: bigint) => {
    markAsReadMutation.mutate(id);
  };

  const handleDelete = (id: bigint) => {
    deleteMutation.mutate(id);
  };

  const sortedMessages = messages?.slice().sort((a, b) => Number(b.createdAt - a.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contact Messages</h1>
        <p className="text-muted-foreground">View and manage contact form submissions</p>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : sortedMessages && sortedMessages.length > 0 ? (
        <div className="space-y-4">
          {sortedMessages.map((message) => (
            <Card key={Number(message.id)} className={message.read ? 'opacity-75' : ''}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{message.name}</CardTitle>
                      {!message.read && <Badge variant="default">New</Badge>}
                    </div>
                    <CardDescription>
                      {message.email} • {formatDate(message.createdAt)}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {!message.read && (
                      <Button variant="ghost" size="icon" onClick={() => handleMarkAsRead(message.id)}>
                        <MailOpen className="h-4 w-4" />
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Message</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this message? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(message.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">{message.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Mail className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">No messages yet. Messages will appear here when visitors contact you.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
