"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { fetchLabelStats } from "@/lib/api";
import { LabelStats } from "@/lib/types";

export default function LabelOverviewPage() {
  const [labelStats, setLabelStats] = useState<LabelStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLabelStats = async () => {
      try {
        const data = await fetchLabelStats();
        setLabelStats(data);
      } catch (error) {
        console.error("Failed to load label stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLabelStats();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  const totalEmails = labelStats.reduce((sum, stat) => sum + stat.count, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Label Overview</h1>
        <p className="text-muted-foreground">
          Breakdown of AI-generated labels and their distribution
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {labelStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <Badge variant="secondary">{stat.count}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.percentage}%</div>
              <Progress value={stat.percentage} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {stat.count} of {totalEmails} emails
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Label Distribution Summary</CardTitle>
          <CardDescription>
            Detailed breakdown of all labels with their counts and percentages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {labelStats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{stat.label}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {stat.count} emails
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={stat.percentage} className="w-24" />
                  <span className="text-sm font-medium w-12 text-right">
                    {stat.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}