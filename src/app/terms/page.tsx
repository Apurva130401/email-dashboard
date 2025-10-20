import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Sparkles } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-white">
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4 shadow-lg">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: October 24, 2025
            </p>
          </div>

          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
            <CardContent className="p-8 text-slate-700 space-y-6">
              <p>
                Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms of Service&quot;) carefully before using the SyncFlo Mail Agent website and services (the &quot;Service&quot;) operated by SyncFlo (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
              </p>
              <p>
                Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
              </p>

              <h2 className="text-2xl font-semibold text-slate-900 pt-4">1. Accounts</h2>
              <p>
                When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
              </p>

              <h2 className="text-2xl font-semibold text-slate-900 pt-4">2. Service Description</h2>
              <p>
                SyncFlo Mail Agent is an AI-powered email management service. It helps you by automatically categorizing your emails, cleaning your inbox, drafting suitable replies, and adding events to your calendar based on email content. The Service requires access to your email account to perform these functions.
              </p>

              <h2 className="text-2xl font-semibold text-slate-900 pt-4">3. Intellectual Property</h2>
              <p>
                The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of SyncFlo and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
              </p>

              <h2 className="text-2xl font-semibold text-slate-900 pt-4">4. Termination</h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
              </p>

              <h2 className="text-2xl font-semibold text-slate-900 pt-4">5. Limitation Of Liability</h2>
              <p>
                In no event shall SyncFlo, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
              </p>

              <h2 className="text-2xl font-semibold text-slate-900 pt-4">6. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of California, United States, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-2xl font-semibold text-slate-900 pt-4">7. Changes</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>

              <h2 className="text-2xl font-semibold text-slate-900 pt-4">Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at support@syncflo.com.
              </p>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3" />
              Powered by AI for smarter email management
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;