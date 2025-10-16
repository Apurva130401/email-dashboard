"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react";
import { fetchIntegrationStatus } from "@/lib/api";
import { IntegrationStatus } from "@/lib/types";

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'connected':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'disconnected':
      return <XCircle className="h-5 w-5 text-red-500" />;
    case 'syncing':
      return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
    default:
      return <Clock className="h-5 w-5 text-gray-500" />;
  }
};

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'connected':
      return 'default';
    case 'disconnected':
      return 'destructive';
    case 'syncing':
      return 'secondary';
    default:
      return 'outline';
  }
};

export default function IntegrationsPage() {
  const [integrationStatus, setIntegrationStatus] = useState<IntegrationStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIntegrationStatus = async () => {
      try {
        const data = await fetchIntegrationStatus();
        setIntegrationStatus(data);
      } catch (error) {
        console.error("Failed to load integration status:", error);
      } finally {
        setLoading(false);
      }
    };

    loadIntegrationStatus();
  }, []);

  const handleSync = async (service: keyof IntegrationStatus) => {
    // Simulate sync action
    setIntegrationStatus(prev => prev ? { ...prev, [service]: 'syncing' as const } : null);

    // Simulate API call delay
    setTimeout(() => {
      setIntegrationStatus(prev => prev ? { ...prev, [service]: 'connected' as const } : null);
    }, 2000);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (!integrationStatus) {
    return <div className="flex items-center justify-center h-64">Failed to load integration status</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">
          Manage your external service connections and sync status
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Google Sheets Integration */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(integrationStatus.googleSheets)}
                <CardTitle>Google Sheets</CardTitle>
              </div>
              <Badge variant={getStatusBadgeVariant(integrationStatus.googleSheets)}>
                {integrationStatus.googleSheets}
              </Badge>
            </div>
            <CardDescription>
              Sync email data to Google Sheets for reporting and analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Status: {integrationStatus.googleSheets === 'connected' ? 'Active' :
                        integrationStatus.googleSheets === 'syncing' ? 'Syncing...' :
                        'Disconnected'}
              </div>
              <Button
                onClick={() => handleSync('googleSheets')}
                disabled={integrationStatus.googleSheets === 'syncing'}
                className="w-full"
              >
                {integrationStatus.googleSheets === 'syncing' ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  'Sync Now'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notion Integration */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(integrationStatus.notion)}
                <CardTitle>Notion</CardTitle>
              </div>
              <Badge variant={getStatusBadgeVariant(integrationStatus.notion)}>
                {integrationStatus.notion}
              </Badge>
            </div>
            <CardDescription>
              Export processed emails to Notion databases for organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Status: {integrationStatus.notion === 'connected' ? 'Active' :
                        integrationStatus.notion === 'syncing' ? 'Syncing...' :
                        'Disconnected'}
              </div>
              <Button
                onClick={() => handleSync('notion')}
                disabled={integrationStatus.notion === 'syncing'}
                className="w-full"
              >
                {integrationStatus.notion === 'syncing' ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  'Sync Now'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Integration Settings</CardTitle>
          <CardDescription>
            Configure your integration preferences and API credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Auto-sync</h4>
                <p className="text-sm text-muted-foreground">
                  Automatically sync data when new emails are processed
                </p>
              </div>
              <Badge variant="outline">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Sync Frequency</h4>
                <p className="text-sm text-muted-foreground">
                  How often to check for new data to sync
                </p>
              </div>
              <Badge variant="outline">Every 15 minutes</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}