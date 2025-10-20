"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Landmark, Mail, Sparkles, CheckCircle, ShoppingCart, ArrowRight, ArrowLeft, ShieldCheck, MessageSquare, HelpCircle, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";

declare global {
    interface Window {
        Razorpay: any;
    }
}

const CheckoutSkeleton: React.FC = () => (
    <div className="min-h-screen bg-slate-50 font-sans">
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="order-2 lg:order-1">
                    <Skeleton className="h-96 w-full rounded-xl" />
                    <div className="flex justify-between mt-8">
                        <Skeleton className="h-12 w-32 rounded-full" />
                        <Skeleton className="h-12 w-32 rounded-full" />
                    </div>
                </div>
                <div className="order-1 lg:order-2">
                    <Skeleton className="h-[600px] w-full rounded-2xl" />
                </div>
            </div>
        </div>
  </div>
);

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [loading, setLoading] = useState(false);

  const [plan, setPlan] = useState({
    name: '',
    price: '',
    billing: '',
    plan_id: ''
  });

  useEffect(() => {
    const planData = {
      name: searchParams.get('plan'),
      price: searchParams.get('price'),
      billing: searchParams.get('billing'),
      plan_id: searchParams.get('plan_id')
    };

    if (planData.name && planData.price && planData.billing && planData.plan_id) {
      setPlan(planData as { name: string; price: string; billing: string; plan_id: string; });
    }
  }, [searchParams]);

  const steps = [
    { id: 1, title: "Billing Info", icon: Mail },
    { id: 2, title: "Payment", icon: CreditCard }
  ];

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePayment = async () => {
    if (paymentMethod !== 'razorpay') return;

    setLoading(true);

    try {
      const response = await fetch('/api/razorpay/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan_id: plan.plan_id }),
      });

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }

      const subscription = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: subscription.id,
        name: "SyncFlo",
        description: `SyncFlo ${plan.name} Plan`,
        handler: function (response: any) {
          router.push(`/payment-confirmation?payment_id=${response.razorpay_payment_id}&subscription_id=${response.razorpay_subscription_id}`);
        },
        prefill: {},
        notes: {
            plan: plan.name,
            billing: plan.billing,
        },
        theme: {
            color: "#3b82f6"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="h-11" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St" className="h-11" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Anytown" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="12345" className="h-11" />
                </div>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="space-y-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <Label htmlFor="card" className={`flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="h-6 w-6 text-slate-600" />
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800">Credit Card</div>
                    <div className="text-sm text-slate-500">Pay with Visa, MasterCard, or Amex</div>
                  </div>
                </Label>
                <Label htmlFor="razorpay" className={`flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'razorpay' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  <RadioGroupItem value="razorpay" id="razorpay" />
                  <Landmark className="h-6 w-6 text-slate-600" />
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800">Razorpay</div>
                    <div className="text-sm text-slate-500">Pay with India's most popular gateway</div>
                  </div>
                </Label>
              </RadioGroup>

              {paymentMethod === "card" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4 pt-6 border-t border-slate-200">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="h-11" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" className="h-11" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  // Render skeleton if plan details are not yet loaded from URL
  if (!plan.plan_id) {
    return <CheckoutSkeleton />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
                 <Image src="/SyncFlo White BG.png" alt="SyncFlo Logo" width={32} height={32} />
            </div>
            <p className="text-sm text-slate-500">Already have an account? <a href="/login" className="font-semibold text-blue-600">Sign In</a></p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Form */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center justify-center mb-8">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center text-center w-32">
                    <motion.div
                      animate={currentStep === step.id ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                        currentStep >= step.id
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-white border-slate-300 text-slate-400'
                      }`}
                    >
                      <step.icon className="h-6 w-6" />
                    </motion.div>
                    <p className={`mt-2 text-sm font-semibold transition-colors ${currentStep >= step.id ? 'text-blue-600' : 'text-slate-500'}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <motion.div
                      className="flex-1 h-1 rounded-full mx-4"
                      initial={false}
                      animate={{ backgroundColor: currentStep > step.id ? '#3b82f6' : '#cbd5e1' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            <Card className="bg-white shadow-lg rounded-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">{steps.find(s => s.id === currentStep)?.title}</CardTitle>
                <CardDescription>Complete the information below.</CardDescription>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
              </CardContent>
            </Card>

            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                variant="outline"
                className="flex items-center h-12 px-6 rounded-full bg-white shadow-md disabled:opacity-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              {currentStep < 2 ? (
                <Button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center h-12 px-6 rounded-full shadow-md"
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full h-14 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-75"
                >
                  {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <CheckCircle className="mr-2 h-6 w-6" />}
                  {loading ? 'Processing...' : `Pay $${plan.price}`}
                </Button>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="order-1 lg:order-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg sticky top-8 border">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center"><ShoppingCart className="mr-3 text-slate-500"/>Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                        <Mail className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">SyncFlo Mail Agent {plan.name}</h3>
                      <p className="text-sm text-slate-500">Billed {plan.billing}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-slate-800">${plan.price}</span>
                </div>
                <div className="border-t border-slate-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-slate-500">
                        <span>Subtotal</span>
                        <span>${plan.price}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                        <span>Taxes</span>
                        <span>$0.00</span>
                    </div>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-slate-800">
                    <span>Total to pay</span>
                    <span>${plan.price}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="flex items-start">
                  <MessageSquare className="w-10 h-10 text-slate-400 mr-4 mt-1"/>
                  <div>
                    <p className="text-sm text-slate-600 italic">"This tool has saved me countless hours. The AI assistant is a game-changer for managing my inbox!"</p>
                    <p className="text-sm font-semibold text-slate-700 mt-2">- Alex Doe, Project Manager</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-md font-semibold text-slate-700 mb-4 flex items-center"><HelpCircle className="mr-2"/>FAQ</h3>
                <div className="space-y-3 text-sm">
                    <p><span className="font-semibold">Is my payment secure?</span><br/>Yes, all payments are processed through Stripe, a certified PCI Service Provider Level 1.</p>
                    <p><span className="font-semibold">Can I cancel anytime?</span><br/>Absolutely. You can cancel your subscription at any time from your account settings.</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  30-Day Money-Back Guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;