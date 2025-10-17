import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Suspense } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SyncFlo Email Assistant - Dashboard",
  description: "AI-powered email analytics and automation dashboard",
};

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5">
      <div className="aurora-background">
        <div className="aurora-shape1"></div>
        <div className="aurora-shape2"></div>
        <div className="aurora-shape3"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Logo/Icon */}
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-2xl">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            SyncFlo
          </h1>
          <p className="text-muted-foreground text-lg">
            Loading your dashboard...
          </p>
        </div>

        {/* Loading Spinner */}
        <div className="flex items-center space-x-2">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Initializing...</span>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gradient-to-r from-primary to-accent rounded-full w-48"></div>
      </div>
    </div>
  );
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="aurora-background">
          <div className="aurora-shape1"></div>
          <div className="aurora-shape2"></div>
          <div className="aurora-shape3"></div>
        </div>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 backdrop-blur-sm bg-background/20">
                  <SidebarTrigger className="-ml-1" />
                  <div className="flex-1" />
                </header>
                <main className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 lg:p-8">
                  <Suspense fallback={<LoadingScreen />}>
                    {children}
                  </Suspense>
                </main>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}