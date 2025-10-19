import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Sparkles } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-white">
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-4 shadow-lg">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: October 24, 2025
            </p>
          </div>

          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
            <CardContent className="p-8 text-slate-700 space-y-6">
              <p>
                This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
              </p>
              <p>
                We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
              </p>

              <h2 className="text-2xl font-semibold text-slate-900 pt-4">1. Information We Collect</h2>
              <p>
                While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Usage Data</li>
              </ul>

              <h2 className="text-2xl font-semibold text-slate-900 pt-4">2. Use of Your Personal Data</h2>
              <p>
                The Company may use Personal Data for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>To provide and maintain our Service, including to monitor the usage of our Service.</li>
                <li>To manage Your Account: to manage Your registration as a user of the Service.</li>
                <li>For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
                <li>To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-slate-900 pt-4">3. Information Sharing</h2>
              <p>
                We may share Your personal information in the following situations:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>With Service Providers: We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.</li>
                <li>For business transfers: We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
                <li>With Your consent: We may disclose Your personal information for any other purpose with Your consent.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-slate-900 pt-4">4. Data Security</h2>
              <p>
                The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
              </p>

              <h2 className="text-2xl font-semibold text-slate-900 pt-4">5. Your Rights</h2>
              <p>
                You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You. Our Service may give You the ability to delete certain information about You from within the Service.
              </p>

              <h2 className="text-2xl font-semibold text-slate-900 pt-4">6. Changes to this Privacy Policy</h2>
              <p>
                We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
              </p>

              <h2 className="text-2xl font-semibold text-slate-900 pt-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, you can contact us at support@syncflo.com.
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

export default PrivacyPolicy;