"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, Download, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CsvData {
  [key: string]: string | number;
}

export default function CsvViewerPage() {
  const [csvUrl, setCsvUrl] = useState("https://docs.google.com/spreadsheets/d/e/2PACX-1vSUAnIOlKL3bZBeFw_FwAxjAjjaa7SlESBPzJGLs3ShXfPsHlhMh9eNrsMpiBzMfwRFMOoMv-CQADnO/pub?output=csv");
  const [data, setData] = useState<CsvData[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchCsvData = async (url: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch CSV: ${response.statusText}`);
      }

      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            setError(`CSV parsing error: ${results.errors[0].message}`);
            return;
          }

          setData(results.data as CsvData[]);
          setHeaders(results.meta.fields || []);
          setLastUpdated(new Date());
          setLoading(false);
        },
        error: (error: Error) => {
          setError(`CSV parsing error: ${error.message}`);
          setLoading(false);
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCsvData(csvUrl);

    // Set up auto-refresh every 60 seconds
    const interval = setInterval(() => {
      fetchCsvData(csvUrl);
    }, 60000);

    return () => clearInterval(interval);
  }, [csvUrl]);

  const handleUrlChange = (newUrl: string) => {
    setCsvUrl(newUrl);
  };

  const handleRefresh = () => {
    fetchCsvData(csvUrl);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">CSV Data Viewer</h1>
        <p className="text-muted-foreground">
          View and monitor live CSV data from external sources
        </p>
      </div>

      {/* URL Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>CSV Source</CardTitle>
          <CardDescription>
            Configure the URL for your CSV data source
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="csv-url">CSV URL</Label>
            <div className="flex gap-2">
              <Input
                id="csv-url"
                value={csvUrl}
                onChange={(e) => setCsvUrl(e.target.value)}
                placeholder="Enter CSV URL..."
                className="flex-1"
              />
              <Button onClick={() => handleUrlChange(csvUrl)} variant="outline">
                Load
              </Button>
              <Button onClick={handleRefresh} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>

          {lastUpdated && (
            <div className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleString()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Data Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Data Table</CardTitle>
              <CardDescription>
                {data.length} rows • {headers.length} columns
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <RefreshCw className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading data...</span>
            </div>
          ) : data.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHead key={header} className="whitespace-nowrap">
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow key={index}>
                      {headers.map((header) => (
                        <TableCell key={header} className="max-w-xs truncate">
                          {row[header]?.toString() || ''}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              No data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}