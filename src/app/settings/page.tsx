"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  User,
  Mail,
  Shield,
  Database,
  Trash2,
  Save,
  CheckCircle,
  AlertTriangle,
  Settings as SettingsIcon,
  Bell,
  Palette,
  Globe
} from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('settings');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Email automation enthusiast and productivity hacker.",
  });

  const [gmailConnected, setGmailConnected] = useState(false);
  const [gmailEmail, setGmailEmail] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const [preferences, setPreferences] = useState({
    notifications: true,
    autoSync: true,
    language: "en",
  });

  const [loading, setLoading] = useState(false);

  const handleProfileSave = () => {
    // Simulate save action
    console.log("Profile saved:", profile);
  };

  const handleGmailConnect = async () => {
    setIsConnecting(true);
    // Simulate OAuth flow
    setTimeout(() => {
      setGmailConnected(true);
      setGmailEmail("john.doe@gmail.com");
      setIsConnecting(false);
    }, 2000);
  };

  const handleGmailDisconnect = () => {
    setGmailConnected(false);
    setGmailEmail("");
  };

  const handlePreferencesSave = () => {
    console.log("Preferences saved:", preferences);
  };

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col space-y-2">
          <div className="h-10 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg animate-pulse w-64" />
          <div className="h-6 bg-muted rounded animate-pulse w-96" />
        </div>

        {/* Account Settings Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-blue-200 rounded animate-pulse" />
            <div className="h-6 bg-muted rounded animate-pulse w-40" />
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-muted rounded animate-pulse" />
                <div className="h-6 bg-muted rounded animate-pulse w-48" />
              </div>
              <div className="h-4 bg-muted rounded animate-pulse w-64" />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse w-20" />
                  <div className="h-10 bg-muted rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse w-24" />
                  <div className="h-10 bg-muted rounded animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse w-12" />
                <div className="h-20 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-10 bg-muted rounded animate-pulse w-32" />
            </div>
          </div>
        </div>

        {/* Email Connections Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-200 rounded animate-pulse" />
            <div className="h-6 bg-muted rounded animate-pulse w-44" />
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-muted rounded animate-pulse" />
                <div className="h-6 bg-muted rounded animate-pulse w-40" />
              </div>
              <div className="h-4 bg-muted rounded animate-pulse w-80" />
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-200 rounded-full mx-auto mb-4 animate-pulse" />
                <div className="h-6 bg-muted rounded animate-pulse w-48 mx-auto mb-2" />
                <div className="h-4 bg-muted rounded animate-pulse w-80 mx-auto mb-6" />
                <div className="h-10 bg-muted rounded animate-pulse w-40 mx-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-orange-200 rounded animate-pulse" />
            <div className="h-6 bg-muted rounded animate-pulse w-28" />
          </div>

          {/* Notifications Card Skeleton */}
          <div className="rounded-lg border bg-card p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-muted rounded animate-pulse" />
                <div className="h-6 bg-muted rounded animate-pulse w-52" />
              </div>
              <div className="h-4 bg-muted rounded animate-pulse w-72" />
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse w-36" />
                  <div className="h-3 bg-muted rounded animate-pulse w-48" />
                </div>
                <div className="h-8 bg-muted rounded animate-pulse w-20" />
              </div>
              <div className="h-8 bg-muted rounded animate-pulse w-32" />
            </div>
          </div>

          {/* Appearance Card Skeleton */}
          <div className="rounded-lg border bg-card p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-muted rounded animate-pulse" />
                <div className="h-6 bg-muted rounded animate-pulse w-32" />
              </div>
              <div className="h-4 bg-muted rounded animate-pulse w-56" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse w-16" />
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-8 bg-muted rounded animate-pulse w-16" />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse w-20" />
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-8 bg-muted rounded animate-pulse w-12" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Management Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-purple-200 rounded animate-pulse" />
            <div className="h-6 bg-muted rounded animate-pulse w-40" />
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-muted rounded animate-pulse" />
                <div className="h-6 bg-muted rounded animate-pulse w-56" />
              </div>
              <div className="h-4 bg-muted rounded animate-pulse w-72" />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="h-20 bg-muted rounded animate-pulse" />
                <div className="h-20 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-200 rounded animate-pulse" />
            <div className="h-6 bg-muted rounded animate-pulse w-28" />
          </div>
          <div className="rounded-lg border-red-200 bg-card p-6">
            <div className="space-y-4">
              <div className="h-6 bg-red-200 rounded animate-pulse w-40" />
              <div className="h-4 bg-red-200 rounded animate-pulse w-64" />
              <div className="p-4 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-red-200 rounded animate-pulse w-32" />
                    <div className="h-3 bg-red-200 rounded animate-pulse w-48" />
                  </div>
                  <div className="h-8 bg-red-200 rounded animate-pulse w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t('description')}
        </p>
      </div>

      {/* Account Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          <h2 className="text-2xl font-semibold">{t('account.title')}</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t('account.profile.title')}
            </CardTitle>
            <CardDescription>
              {t('account.profile.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">{t('account.profile.name')}</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('account.profile.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">{t('account.profile.bio')}</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </div>
            <Button onClick={handleProfileSave} className="w-full md:w-auto">
              <Save className="mr-2 h-4 w-4" />
              {t('account.profile.save')}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Email Connections */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-green-600" />
          <h2 className="text-2xl font-semibold">{t('connections.title')}</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              {t('connections.gmail.title')}
            </CardTitle>
            <CardDescription>
              {t('connections.gmail.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {gmailConnected ? (
              <div className="space-y-4">
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">{t('connections.gmail.connected')}</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Successfully connected to {gmailEmail}. Your emails are being processed.
                  </AlertDescription>
                </Alert>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/5968/5968534.png"
                        alt="Gmail"
                        className="h-5 w-5"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{gmailEmail}</p>
                      <p className="text-sm text-muted-foreground">Connected • {t('connections.gmail.lastSync')}: 2 minutes {t('connections.gmail.ago')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {t('connections.gmail.active')}
                    </Badge>
                    <Button variant="outline" size="sm" onClick={handleGmailDisconnect}>
                      {t('connections.gmail.disconnect')}
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">1,247</div>
                    <p className="text-sm text-muted-foreground">{t('connections.gmail.processed')}</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">98.5%</div>
                    <p className="text-sm text-muted-foreground">{t('connections.gmail.successRate')}</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">24</div>
                    <p className="text-sm text-muted-foreground">{t('connections.gmail.labels')}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>{t('connections.gmail.noConnection')}</AlertTitle>
                  <AlertDescription>
                    {t('connections.gmail.noConnectionDesc')}
                  </AlertDescription>
                </Alert>

                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/5968/5968534.png"
                      alt="Gmail"
                      className="h-8 w-8"
                    />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{t('connections.gmail.title')}</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    {t('connections.gmail.secure')}
                  </p>
                  <Button
                    onClick={handleGmailConnect}
                    disabled={isConnecting}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isConnecting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {t('connections.gmail.connecting')}
                      </>
                    ) : (
                      <>
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/5968/5968534.png"
                          alt="Gmail"
                          className="h-4 w-4 mr-2"
                        />
                        {t('connections.gmail.connect')}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Preferences */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <SettingsIcon className="h-5 w-5 text-orange-600" />
          <h2 className="text-2xl font-semibold">{t('preferences.title')}</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              {t('preferences.notifications.title')}
            </CardTitle>
            <CardDescription>
              {t('preferences.notifications.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t('preferences.notifications.email')}</Label>
                <p className="text-sm text-muted-foreground">{t('preferences.notifications.emailDesc')}</p>
              </div>
              <Button
                variant={preferences.notifications ? "default" : "outline"}
                size="sm"
                onClick={() => setPreferences(prev => ({ ...prev, notifications: !prev.notifications }))}
              >
                {preferences.notifications ? t('preferences.notifications.enabled') : t('preferences.notifications.disabled')}
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>{t('preferences.notifications.autoSync')}</Label>
                <p className="text-sm text-muted-foreground">{t('preferences.notifications.autoSyncDesc')}</p>
              </div>
              <Button
                variant={preferences.autoSync ? "default" : "outline"}
                size="sm"
                onClick={() => setPreferences(prev => ({ ...prev, autoSync: !prev.autoSync }))}
              >
                {preferences.autoSync ? t('preferences.notifications.enabled') : t('preferences.notifications.disabled')}
              </Button>
            </div>

            <Button onClick={handlePreferencesSave} className="w-full md:w-auto">
              <Save className="mr-2 h-4 w-4" />
              {t('preferences.notifications.save')}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              {t('preferences.appearance.title')}
            </CardTitle>
            <CardDescription>
              {t('preferences.appearance.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t('preferences.appearance.theme')}</Label>
              <div className="flex gap-2">
                {["light", "dark", "system"].map((themeOption) => (
                  <Button
                    key={themeOption}
                    variant={theme === themeOption ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme(themeOption)}
                    className="capitalize"
                  >
                    {themeOption}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>{t('preferences.appearance.language')}</Label>
              <div className="flex gap-2">
                {["en", "es", "fr", "de"].map((lang) => (
                  <Button
                    key={lang}
                    variant={locale === lang ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      const newPath = pathname.replace(`/${locale}`, `/${lang}`);
                      router.push(newPath);
                    }}
                    className="uppercase"
                  >
                    {lang}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Management */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-purple-600" />
          <h2 className="text-2xl font-semibold">{t('data.title')}</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              {t('data.export.title')}
            </CardTitle>
            <CardDescription>
              {t('data.export.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Database className="h-6 w-6" />
                {t('data.export.export')}
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Globe className="h-6 w-6" />
                {t('data.export.import')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-red-600" />
          <h2 className="text-2xl font-semibold">{t('danger.title')}</h2>
        </div>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {t('danger.critical.title')}
            </CardTitle>
            <CardDescription>
              {t('danger.critical.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
              <div>
                <h4 className="font-medium text-red-900">{t('danger.critical.reset')}</h4>
                <p className="text-sm text-red-700">
                  {t('danger.critical.resetDesc')}
                </p>
              </div>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                {t('danger.critical.reset')}
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
              <div>
                <h4 className="font-medium text-red-900">{t('danger.critical.delete')}</h4>
                <p className="text-sm text-red-700">
                  {t('danger.critical.deleteDesc')}
                </p>
              </div>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                {t('danger.critical.delete')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}