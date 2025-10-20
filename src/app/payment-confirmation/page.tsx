
"use client";

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentConfirmationPage: React.FC = () => {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const subscriptionId = searchParams.get('subscription_id');

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full text-center border border-slate-200"
      >
        <motion.div
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
          className="mx-auto w-20 h-20 flex items-center justify-center bg-green-100 rounded-full mb-6"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-slate-800 mb-3">Payment Successful!</h1>
        <p className="text-slate-600 mb-8">Thank you for subscribing to SyncFlo. Your account has been upgraded.</p>

        <div className="bg-slate-50 rounded-lg p-4 text-left text-sm text-slate-700 space-y-2 border border-slate-200">
          <div className="flex justify-between">
            <span className="font-semibold">Payment ID:</span>
            <span className="font-mono text-xs bg-slate-200 px-2 py-1 rounded">{paymentId || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Subscription ID:</span>
            <span className="font-mono text-xs bg-slate-200 px-2 py-1 rounded">{subscriptionId || 'N/A'}</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 mt-8">
          A confirmation email has been sent to your inbox. If you have any questions, please contact our support team.
        </p>

        <Button asChild className="mt-6 w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group">
          <Link href="/dashboard">
            Go To The Dashboard
            <ArrowRight className="ml-2 h-5 w-5 transition-transform transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default PaymentConfirmationPage;
