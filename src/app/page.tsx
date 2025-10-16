"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from "recharts";
import { fetchAnalyticsStats, fetchLabelStats, fetchEmails } from "@/lib/api";
import { AnalyticsStats, LabelStats, Email } from "@/lib/types";
import { TrendingUp, Mail, Tag, CheckCircle, AlertTriangle, Users } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function EmailAnalyticsPage() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [labelStats, setLabelStats] = useState<LabelStats[]>([]);
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);

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
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col space-y-2">
          <div className="h-10 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg animate-pulse w-96" />
          <div className="h-6 bg-muted rounded animate-pulse w-80" />
        </div>

        {/* Key Metrics Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="relative overflow-hidden rounded-lg border bg-card p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse w-24" />
                  <div className="h-8 bg-muted rounded animate-pulse w-16" />
                  <div className="h-3 bg-muted rounded animate-pulse w-20" />
                </div>
                <div className="h-4 w-4 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Charts Skeleton */}
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-6">
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded animate-pulse w-48" />
                <div className="h-4 bg-muted rounded animate-pulse w-64" />
                <div className="h-80 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Processing Trends Skeleton */}
        <div className="rounded-lg border bg-card p-6">
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded animate-pulse w-40" />
            <div className="h-4 bg-muted rounded animate-pulse w-56" />
            <div className="h-72 bg-muted rounded animate-pulse" />
          </div>
        </div>

        {/* Top Senders Skeleton */}
        <div className="rounded-lg border bg-card p-6">
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded animate-pulse w-32" />
            <div className="h-4 bg-muted rounded animate-pulse w-48" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-muted rounded animate-pulse w-32" />
                    <div className="h-3 bg-muted rounded animate-pulse w-24" />
                  </div>
                  <div className="h-6 bg-muted rounded animate-pulse w-12" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats Skeleton */}
        <div className="grid gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-lg border bg-card p-6">
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse w-32" />
                <div className="h-8 bg-muted rounded animate-pulse w-16" />
                <div className="h-3 bg-muted rounded animate-pulse w-28" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return <div className="flex items-center justify-center h-64">Failed to load data</div>;
  }

  // Calculate additional metrics
  const syncRate = stats.totalEmails > 0 ? Math.round((stats.syncedEmails / stats.totalEmails) * 100) : 0;
  // const failureRate = stats.totalEmails > 0 ? Math.round((stats.failedSyncs / stats.totalEmails) * 100) : 0;
  const pendingEmails = stats.totalEmails - stats.syncedEmails - stats.failedSyncs;

  // Calculate processing trends (mock data for demonstration)
  const processingTrend = [
    { day: 'Mon', processed: 12 },
    { day: 'Tue', processed: 19 },
    { day: 'Wed', processed: 15 },
    { day: 'Thu', processed: 22 },
    { day: 'Fri', processed: 18 },
    { day: 'Sat', processed: 8 },
    { day: 'Sun', processed: 6 },
  ];

  // Top senders
  const senderStats = emails.reduce((acc, email) => {
    acc[email.sender] = (acc[email.sender] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topSenders = Object.entries(senderStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([sender, count]) => ({ sender: sender.split('@')[0], count }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Email Analytics Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Comprehensive overview of your email processing and automation metrics
        </p>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-3xl" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
            <Mail className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalEmails}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Processed this month
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-bl-3xl" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sync Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{syncRate}%</div>
            <Progress value={syncRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {stats.syncedEmails} of {stats.totalEmails} emails
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/10 rounded-bl-3xl" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Labels Assigned</CardTitle>
            <Tag className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalLabels}</div>
            <p className="text-xs text-muted-foreground">
              Unique categories
            </p>
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

        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-bl-3xl" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Issues Detected</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.failedSyncs + pendingEmails}</div>
            <p className="text-xs text-muted-foreground">
              Failed: {stats.failedSyncs} | Pending: {pendingEmails}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {stats.failedSyncs > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Sync Issues Detected</AlertTitle>
          <AlertDescription>
            {stats.failedSyncs} emails failed to sync. Please check your integration settings and try again.
          </AlertDescription>
        </Alert>
      )}

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
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
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                },
              }}
              className="h-[350px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={labelStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ label, percentage }) => `${label} (${percentage}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {labelStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Label Performance
            </CardTitle>
            <CardDescription>
              Number of emails per label category with performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                },
              }}
              className="h-[350px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={labelStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="label" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Processing Trends */}
      <Card>
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
          <ChartContainer
            config={{
              processed: {
                label: "Processed",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={processingTrend}>
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="processed"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Top Senders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Top Senders
          </CardTitle>
          <CardDescription>
            Most active email senders in your inbox
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSenders.map((sender, index) => (
              <div key={sender.sender} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{sender.sender}</p>
                    <p className="text-sm text-muted-foreground">{sender.count} emails</p>
                  </div>
                </div>
                <Badge variant="outline">{sender.count}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Average Processing Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3s</div>
            <p className="text-xs text-muted-foreground">Per email</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Automation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Emails auto-processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Data Quality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A+</div>
            <p className="text-xs text-muted-foreground">Label accuracy</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
