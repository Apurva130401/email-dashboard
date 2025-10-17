import Papa from "papaparse";
import { Email, LabelStats, AnalyticsStats, IntegrationStatus } from './types';
import { mockIntegrationStatus } from './mock-data';

const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSUAnIOlKL3bZBeFw_FwAxjAjjaa7SlESBPzJGLs3ShXfPsHlhMh9eNrsMpiBzMfwRFMOoMv-CQADnO/pub?output=csv";


export const fetchEmails = async (): Promise<Email[]> => {
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }

    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error(`CSV parsing error: ${results.errors[0].message}`));
            return;
          }

          const emails: Email[] = (results.data as Record<string, unknown>[]).map((row, index: number) => ({
            id: String(row['Message ID'] || `email-${index + 1}`),
            sender: String(row['Sender Email'] || row['Sender Name'] || ''),
            subject: String(row['Subject'] || ''),
            body: String(row['Summary'] || ''),
            label: String(row['Label'] || 'Unlabeled'),
            category: (row['Category'] as Email['category']) || 'inbox',
            processedAt: String(row['Processed At'] || row['Timestamp'] || new Date().toISOString()),
            syncStatus: (row['Sync Status'] as Email['syncStatus']) || 'synced',
          }));

          resolve(emails);
        },
        error: (error: Error) => {
          reject(new Error(`CSV parsing error: ${error.message}`));
        }
      });
    });
  } catch (error) {
    console.error('Error fetching emails:', error);
    throw error;
  }
};

export const fetchAnalyticsStats = async (): Promise<AnalyticsStats> => {
  const emails = await fetchEmails();
  const totalEmails = emails.length;
  const totalLabels = new Set(emails.map(email => email.label)).size;
  const syncedEmails = emails.filter(email => email.syncStatus === 'synced').length;
  const failedSyncs = emails.filter(email => email.syncStatus === 'failed').length;

  return {
    totalEmails,
    totalLabels,
    syncedEmails,
    failedSyncs,
  };
};

export const fetchLabelStats = async (): Promise<LabelStats[]> => {
  const emails = await fetchEmails();
  const labelCounts: { [key: string]: number } = {};

  emails.forEach(email => {
    labelCounts[email.label] = (labelCounts[email.label] || 0) + 1;
  });

  const totalEmails = emails.length;
  const labelStats: LabelStats[] = Object.entries(labelCounts).map(([label, count]) => ({
    label,
    count,
    percentage: totalEmails > 0 ? Math.round((count / totalEmails) * 100 * 100) / 100 : 0,
  }));

  return labelStats;
};

export const fetchIntegrationStatus = async (): Promise<IntegrationStatus> => {
  // Keep mock data for integration status as it's not in CSV
  return mockIntegrationStatus;
};