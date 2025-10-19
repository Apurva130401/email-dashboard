
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Landmark, Mail, Sparkles, CheckCircle, ShoppingCart, ArrowRight, ArrowLeft } from "lucide-react";

const CheckoutPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const steps = [
    { id: 1, title: "Order Summary", icon: ShoppingCart },
    { id: 2, title: "Billing Info", icon: Mail },
    { id: 3, title: "Payment", icon: CreditCard }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePayment = () => {
    if (paymentMethod === "razorpay") {
      alert("Redirecting to Razorpay for payment...");
      // In a real application, you would redirect to Razorpay here.
    } else {
      alert("Processing payment...");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Order Summary
              </CardTitle>
              <CardDescription>Review your purchase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-slate-900">SyncFlo Mail Agent Pro</h3>
                    <p className="text-sm text-slate-600">Monthly subscription</p>
                  </div>
                  <span className="font-semibold text-slate-900">$29.99/month</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-slate-900">$29.99</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Billing Information</CardTitle>
              <CardDescription>Enter your billing details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-slate-900">First Name</Label>
                  <Input id="firstName" placeholder="John" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-slate-900">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-900">Email Address</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium text-slate-900">Address</Label>
                <Input id="address" placeholder="123 Main St" className="h-12" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="city" className="text-sm font-medium text-slate-900">City</Label>
                  <Input id="city" placeholder="Anytown" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip" className="text-sm font-medium text-slate-900">ZIP Code</Label>
                  <Input id="zip" placeholder="12345" className="h-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Payment Method</CardTitle>
              <CardDescription>Choose your preferred payment option</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                    <CreditCard className="mr-3 h-5 w-5 text-slate-600" />
                    <div>
                      <div className="font-medium text-slate-900">Credit Card</div>
                      <div className="text-sm text-slate-600">Visa, MasterCard, Amex</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors">
                  <RadioGroupItem value="razorpay" id="razorpay" />
                  <Label htmlFor="razorpay" className="flex items-center cursor-pointer flex-1">
                    <Landmark className="mr-3 h-5 w-5 text-slate-600" />
                    <div>
                      <div className="font-medium text-slate-900">Razorpay</div>
                      <div className="text-sm text-slate-600">Indian payment gateway</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-sm font-medium text-slate-900">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="h-12" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry" className="text-sm font-medium text-slate-900">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-sm font-medium text-slate-900">CVV</Label>
                      <Input id="cvv" placeholder="123" className="h-12" />
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handlePayment}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Complete Purchase - $29.99
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Checkout</h1>
          <p className="text-slate-600">Complete your SyncFlo Mail Agent purchase</p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-slate-300 text-slate-400'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-slate-900' : 'text-slate-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-slate-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            variant="outline"
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          {currentStep < 3 ? (
            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 flex items-center"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : null}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-600 flex items-center justify-center gap-1">
            <Sparkles className="h-3 w-3" />
            Secure checkout powered by industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
