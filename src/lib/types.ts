export interface Email {
  id: string;
  sender: string;
  subject: string;
  body: string;
  label: string;
  processedAt: string;
  syncStatus: 'synced' | 'pending' | 'failed';
}

export interface LabelStats {
  label: string;
  count: number;
  percentage: number;
}

export interface AnalyticsStats {
  totalEmails: number;
  totalLabels: number;
  syncedEmails: number;
  failedSyncs: number;
}

export interface IntegrationStatus {
  googleSheets: 'connected' | 'disconnected' | 'syncing';
  notion: 'connected' | 'disconnected' | 'syncing';
}