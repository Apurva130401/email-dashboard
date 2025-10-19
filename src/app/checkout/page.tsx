
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Landmark, Mail, Sparkles, CheckCircle, ShoppingCart } from "lucide-react";

const CheckoutPage: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePayment = () => {
    if (paymentMethod === "razorpay") {
      alert("Redirecting to Razorpay for payment...");
      // In a real application, you would redirect to Razorpay here.
    } else {
      alert("Processing payment...");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-12 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-8 border border-white/20">
            <ShoppingCart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Complete Your<br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              SyncFlo Mail Agent
            </span><br />
            Purchase
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Secure checkout for your AI-powered email management solution. Get started in minutes.
          </p>
          <div className="flex items-center space-x-6 text-slate-400">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-400" />
              <span>Instant Activation</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-12 right-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Premium Features</p>
                <p className="text-slate-400 text-sm">Advanced AI email processing and automation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Checkout form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="w-full max-w-2xl space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Secure Checkout</h2>
            <p className="text-slate-600">Complete your purchase below</p>
          </div>

          {/* Order Summary */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-700">SyncFlo Mail Agent Pro</span>
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

          {/* Billing Information */}
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

          {/* Payment Method */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Payment Method</CardTitle>
              <CardDescription>Choose your preferred payment option</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:border-purple-300 transition-colors">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center cursor-pointer flex-1">
                    <CreditCard className="mr-3 h-5 w-5 text-slate-600" />
                    <div>
                      <div className="font-medium text-slate-900">Credit Card</div>
                      <div className="text-sm text-slate-600">Visa, MasterCard, Amex</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:border-purple-300 transition-colors">
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
                className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Complete Purchase - $29.99
              </Button>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center">
            <p className="text-sm text-slate-600 flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3" />
              Secure checkout powered by industry-standard encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
