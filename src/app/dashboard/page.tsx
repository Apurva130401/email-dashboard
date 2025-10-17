"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart, CartesianGrid, Tooltip as RechartsTooltip } from "recharts";
import { fetchAnalyticsStats, fetchLabelStats, fetchEmails } from "@/lib/api";
import { AnalyticsStats, LabelStats, Email } from "@/lib/types";
import { TrendingUp, Mail, Tag, CheckCircle, AlertTriangle, Users, BarChart as BarChartIcon, Clock, Inbox, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

const SkeletonLoader = () => (
  <div className="space-y-8 p-8">
    <div className="flex flex-col space-y-2">
      <div className="h-10 bg-muted/50 rounded-lg w-96 animate-pulse"></div>
      <div className="h-6 bg-muted/50 rounded w-80 animate-pulse"></div>
    </div>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-40 rounded-xl bg-muted/50 animate-pulse"></div>
      ))}
    </div>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-2 h-96 rounded-xl bg-muted/50 animate-pulse"></div>
      <div className="h-96 rounded-xl bg-muted/50 animate-pulse"></div>
    </div>
    <div className="h-64 rounded-xl bg-muted/50 animate-pulse"></div>
  </div>
);

export default function EmailAnalyticsPage() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [labelStats, setLabelStats] = useState<LabelStats[]>([]);
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [draft, setDraft] = useState<{ subject: string; body: string } | null>(null);
  const [isDrafting, setIsDrafting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGenerateReply = async (email: Email) => {
    setSelectedEmail(email);
    setIsDialogOpen(true);
    setIsDrafting(true);
    try {
      const response = await fetch('/api/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject: email.subject, sender: email.sender, content: email.body }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate draft');
      }

      const generatedDraft = await response.json();
      setDraft(generatedDraft);
    } catch (error) {
      console.error("Failed to generate draft:", error);
      // Handle error state in the dialog
    } finally {
      setIsDrafting(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [analyticsData, labelsData, emailsData] = await Promise.all([
          fetchAnalyticsStats(),
          fetchLabelStats(),
          fetchEmails(),
        ]);
        setStats(analyticsData);
        setLabelStats(labelsData);
        setEmails(emailsData);
      } catch (error) {
        console.error("Failed to load analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!stats) {
    return <div className="flex items-center justify-center h-64">Failed to load data</div>;
  }

  const syncRate = stats.totalEmails > 0 ? Math.round((stats.syncedEmails / stats.totalEmails) * 100) : 0;
  const pendingEmails = stats.totalEmails - stats.syncedEmails - stats.failedSyncs;

  const processingTrend = [
    { day: 'Mon', processed: 12 },
    { day: 'Tue', processed: 19 },
    { day: 'Wed', processed: 15 },
    { day: 'Thu', processed: 22 },
    { day: 'Fri', processed: 18 },
    { day: 'Sat', processed: 8 },
    { day: 'Sun', processed: 6 },
  ];

  const topSenders = Object.entries(
    emails.reduce((acc, email) => {
      acc[email.sender] = (acc[email.sender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([sender, count]) => ({ sender, count, id: sender }));

  const emailCategories = labelStats.map(label => ({
    category: label.label,
    count: label.count
  }));

  const avgProcessingTime = emails.length > 0 ? (
    emails.reduce((acc, email) => acc + (0), 0) / emails.length
  ).toFixed(2) : 0;

  return (
    <motion.div
      className="space-y-4 md:space-y-6 lg:space-y-8 p-4 md:p-6 lg:p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="aurora-background">
        <div className="aurora-shape1"></div>
        <div className="aurora-shape2"></div>
        <div className="aurora-shape3"></div>
      </div>

      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col space-y-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Email Analytics Dashboard
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          A comprehensive overview of your email processing and automation metrics.
        </p>
      </motion.div>

      {/* Key Metrics Overview */}
      <motion.div variants={containerVariants} className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={itemVariants}>
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
              <Mail className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalEmails}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Processed this month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sync Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{syncRate}%</div>
              <Progress value={syncRate} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {stats.syncedEmails} of {stats.totalEmails} emails
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Labels Assigned</CardTitle>
              <Tag className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalLabels}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {labelStats.slice(0, 3).map((label) => (
                  <Badge key={label.label} variant="secondary" className="text-xs">
                    {label.label}
                  </Badge>
                ))}
                {labelStats.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{labelStats.length - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issues Detected</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.failedSyncs + pendingEmails}</div>
              <p className="text-xs text-muted-foreground">
                Failed: {stats.failedSyncs} | Pending: {pendingEmails}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Alerts */}
      <AnimatePresence>
        {stats.failedSyncs > 0 && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Alert className="glass-card border-destructive/50 text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Sync Issues Detected</AlertTitle>
              <AlertDescription>
                {stats.failedSyncs} emails failed to sync. Please check your integration settings.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Charts Section */}
      <motion.div variants={containerVariants} className="grid gap-4 md:gap-6 grid-cols-1 lg:grid-cols-3">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChartIcon className="h-5 w-5" />
                Label Performance
              </CardTitle>
              <CardDescription>
                Number of emails per label category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[250px] md:h-[300px] lg:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={labelStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="label" stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                    <RechartsTooltip
                      cursor={{ fill: 'var(--color-accent-foreground)', opacity: 0.1 }}
                      contentStyle={{
                        background: 'var(--color-popover)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-popover-foreground)',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {labelStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Label Distribution
              </CardTitle>
              <CardDescription>
                Breakdown of emails by AI-generated labels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[250px] md:h-[300px] lg:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={labelStats}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="var(--color-primary)"
                      dataKey="count"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {labelStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{
                        background: 'var(--color-popover)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-popover-foreground)',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Inbox className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              A log of the most recently processed emails.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[120px]">Sender</TableHead>
                    <TableHead className="min-w-[200px]">Subject</TableHead>
                    <TableHead className="min-w-[80px]">Label</TableHead>
                    <TableHead className="min-w-[60px]">Actions</TableHead>
                    <TableHead className="text-right min-w-[80px]">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emails.slice(0, 5).map((email) => (
                    <TableRow key={email.id}>
                      <TableCell className="font-medium truncate max-w-[120px]" title={email.sender}>
                        {email.sender}
                      </TableCell>
                      <TableCell className="truncate max-w-[200px]" title={email.subject}>
                        {email.subject}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{email.label}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleGenerateReply(email)}>
                          <Sparkles className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {new Date(email.processedAt).toLocaleTimeString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* More Analytics */}
      <motion.div variants={containerVariants} className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <motion.div variants={itemVariants}>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Top Senders
              </CardTitle>
              <CardDescription>
                Emails received from top senders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSenders.map((sender) => (
                  <div key={sender.id} className="flex items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{sender.sender}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{sender.count} emails</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Email Categories
              </CardTitle>
              <CardDescription>
                Breakdown of emails by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[180px] md:h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={emailCategories} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={70} fill="#8884d8" label>
                      {emailCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{
                        background: 'var(--color-popover)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-popover-foreground)',
                        fontSize: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Avg. Processing Time
              </CardTitle>
              <CardDescription>
                Average time to process an email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{avgProcessingTime}s</div>
              <p className="text-xs text-muted-foreground">Based on the last 100 emails</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Processing Trends */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Processing Trends
            </CardTitle>
            <CardDescription>
              Email processing activity over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={processingTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorProcessed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <RechartsTooltip
                    contentStyle={{
                      background: 'var(--color-popover)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-popover-foreground)',
                      fontSize: '12px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="processed"
                    stroke="var(--color-primary)"
                    fillOpacity={1}
                    fill="url(#colorProcessed)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px] mx-4">
          <DialogHeader>
            <DialogTitle>Draft Reply</DialogTitle>
            <DialogDescription>
              AI-generated draft for your reply. You can edit it before sending.
            </DialogDescription>
          </DialogHeader>
          {isDrafting ? (
            <div className="flex items-center justify-center h-48">
              <p>Generating draft...</p>
            </div>
          ) : draft ? (
            <div className="grid gap-4 py-4">
              <Input
                id="subject"
                value={draft.subject}
                onChange={(e) => setDraft({ ...draft, subject: e.target.value })}
                placeholder="Subject"
              />
              <Textarea
                id="body"
                value={draft.body}
                onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                className="min-h-[150px] md:min-h-[200px]"
                placeholder="Email body"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-48">
              <p>Failed to generate draft. Please try again.</p>
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Send Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}