"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Download, Mail, ExternalLink, ArrowUpDown, ArrowUp, ArrowDown, Eye, Sparkles } from "lucide-react";
import { fetchEmails } from "@/lib/api";
import { Email } from "@/lib/types";

const getStatusBadgeVariant = (status: Email['syncStatus']) => {
  switch (status) {
    case 'synced':
      return 'default';
    case 'pending':
      return 'secondary';
    case 'failed':
      return 'destructive';
    default:
      return 'outline';
  }
};

type SortField = 'sender' | 'subject' | 'label' | 'syncStatus' | 'processedAt';
type SortDirection = 'asc' | 'desc' | null;

export default function EmailLogsPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'inbox' | 'sent' | 'outbox'>('all');
  const [sortField, setSortField] = useState<SortField | null>('processedAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [draft, setDraft] = useState<{ subject: string; body: string } | null>(null);
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);
  const [draftError, setDraftError] = useState<string | null>(null);

  useEffect(() => {
    const loadEmails = async () => {
      try {
        const data = await fetchEmails();
        setEmails(data);
        setFilteredEmails(data);
      } catch (error) {
        console.error("Failed to load emails:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEmails();
  }, []);

  const sortEmails = (emails: Email[], field: SortField | null, direction: SortDirection): Email[] => {
    if (!field || !direction) return emails;

    return [...emails].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (field) {
        case 'sender':
          aValue = a.sender.toLowerCase();
          bValue = b.sender.toLowerCase();
          break;
        case 'subject':
          aValue = a.subject.toLowerCase();
          bValue = b.subject.toLowerCase();
          break;
        case 'label':
          aValue = a.label.toLowerCase();
          bValue = b.label.toLowerCase();
          break;
        case 'syncStatus':
          aValue = a.syncStatus;
          bValue = b.syncStatus;
          break;
        case 'processedAt':
          aValue = new Date(a.processedAt).getTime();
          bValue = new Date(b.processedAt).getTime();
          break;
        default:
          return 0;
      }

      if (direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  };

  useEffect(() => {
    let result = emails;

    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(email => email.category === categoryFilter);
    }

    // Apply date filter
    if (dateFilter) {
      result = result.filter(email => {
        const emailDate = new Date(email.processedAt).toISOString().split('T')[0];
        return emailDate === dateFilter;
      });
    }

    // Apply sorting
    result = sortEmails(result, sortField, sortDirection);

    setFilteredEmails(result);
  }, [dateFilter, categoryFilter, emails, sortField, sortDirection]);

  const handleDownloadExcel = () => {
    // Convert emails to CSV format for Excel
    const headers = ['Sender', 'Subject', 'Summary', 'Label', 'Status', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredEmails.map(email => [
        `"${email.sender}"`, 
        `"${email.subject}"`, 
        `"${email.body}"`, 
        `"${email.label}"`, 
        `"${email.syncStatus}"`, 
        `"${new Date(email.processedAt).toLocaleDateString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `emails_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInGmail = () => {
    // This would ideally use the Message ID to construct a Gmail URL
    // For now, we'll open Gmail's inbox
    window.open('https://mail.google.com/mail/u/0/#inbox', '_blank');
  };

  const handleGenerateDraft = async (email: Email) => {
    setIsGeneratingDraft(true);
    setDraft(null);
    setDraftError(null);
    try {
      const response = await fetch('/api/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: email.sender,
          subject: email.subject,
          content: email.body,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate draft');
      }

      const draftData = await response.json();
      setDraft(draftData);
    } catch (error) {
      setDraftError('Failed to generate draft. Please try again.');
      console.error("Error generating draft:", error);
    } finally {
      setIsGeneratingDraft(false);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 ml-1" />;
    }
    if (sortDirection === 'asc') {
      return <ArrowUp className="h-4 w-4 ml-1" />;
    }
    if (sortDirection === 'desc') {
      return <ArrowDown className="h-4 w-4 ml-1" />;
    }
    return <ArrowUpDown className="h-4 w-4 ml-1" />;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mailbox</h1>
          <p className="text-muted-foreground">
            Comprehensive view of all processed emails with summaries and actions
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleDownloadExcel} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <Button variant={categoryFilter === 'all' ? 'secondary' : 'ghost'} onClick={() => setCategoryFilter('all')}>All</Button>
              <Button variant={categoryFilter === 'inbox' ? 'secondary' : 'ghost'} onClick={() => setCategoryFilter('inbox')}>Inbox</Button>
              <Button variant={categoryFilter === 'sent' ? 'secondary' : 'ghost'} onClick={() => setCategoryFilter('sent')}>Sent</Button>
              <Button variant={categoryFilter === 'outbox' ? 'secondary' : 'ghost'} onClick={() => setCategoryFilter('outbox')}>Outbox</Button>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Calendar className="h-4 w-4" />
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-40"
                placeholder="Filter by date"
              />
              {dateFilter && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDateFilter("")}
                >
                  Clear
                </Button>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {filteredEmails.length} of {emails.length} emails
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Processed Emails</CardTitle>
          <CardDescription>
            Detailed log of all emails processed by the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-48">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('sender')}
                      className="h-auto p-0 font-medium hover:bg-transparent"
                    >
                      Sender
                      {getSortIcon('sender')}
                    </Button>
                  </TableHead>
                  <TableHead className="min-w-64">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('subject')}
                      className="h-auto p-0 font-medium hover:bg-transparent"
                    >
                      Subject
                      {getSortIcon('subject')}
                    </Button>
                  </TableHead>
                  <TableHead className="min-w-80">Summary</TableHead>
                  <TableHead className="w-32">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('label')}
                      className="h-auto p-0 font-medium hover:bg-transparent"
                    >
                      Label
                      {getSortIcon('label')}
                    </Button>
                  </TableHead>
                  <TableHead className="w-24">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('syncStatus')}
                      className="h-auto p-0 font-medium hover:bg-transparent"
                    >
                      Status
                      {getSortIcon('syncStatus')}
                    </Button>
                  </TableHead>
                  <TableHead className="w-32">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('processedAt')}
                      className="h-auto p-0 font-medium hover:bg-transparent"
                    >
                      Date
                      {getSortIcon('processedAt')}
                    </Button>
                  </TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmails.map((email) => (
                  <TableRow key={email.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {email.sender}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={email.subject}>
                        {email.subject}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <div 
                        className="truncate text-sm text-muted-foreground cursor-pointer hover:text-foreground"
                        onClick={() => setSelectedEmail(email)}
                        title={email.body}
                      >
                        {email.body}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{email.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(email.syncStatus)}>
                        {email.syncStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(email.processedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenInGmail()}
                        className="h-8 w-8 p-0"
                        title="Open in Gmail"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleGenerateDraft(email)}
                        className="h-8 w-8 p-0"
                        title="Generate Draft"
                        disabled={isGeneratingDraft}
                      >
                        <Sparkles className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredEmails.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {dateFilter ? "No emails found for the selected date." : "No emails available."}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedEmail} onOpenChange={() => setSelectedEmail(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Summary
            </DialogTitle>
            <DialogDescription>
              Full summary of the processed email
            </DialogDescription>
          </DialogHeader>
          {selectedEmail && (
            <div className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium">From</label>
                  <p className="text-sm text-muted-foreground">{selectedEmail.sender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <p className="text-sm text-muted-foreground">{selectedEmail.subject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Label</label>
                  <Badge variant="outline">{selectedEmail.label}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Badge variant={getStatusBadgeVariant(selectedEmail.syncStatus)}>
                    {selectedEmail.syncStatus}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium">Processed Date</label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedEmail.processedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Full Summary</label>
                <div className="mt-2 p-4 bg-muted rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{selectedEmail.body}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!draft || !!draftError} onOpenChange={() => { setDraft(null); setDraftError(null); }}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              AI Generated Draft
            </DialogTitle>
            <DialogDescription>
              Here is a draft generated by AI. You can copy the content.
            </DialogDescription>
          </DialogHeader>
          {isGeneratingDraft && <div className="flex items-center justify-center h-32">Generating...</div>}
          {draftError && <div className="text-red-500">{draftError}</div>}
          {draft && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Subject</label>
                <Input value={draft.subject} readOnly />
              </div>
              <div>
                <label className="text-sm font-medium">Body</label>
                <textarea
                  value={draft.body}
                  readOnly
                  className="w-full h-64 p-2 border rounded"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
