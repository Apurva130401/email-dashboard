"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Receipt,
  Mail,
  Database
} from "lucide-react";

export default function BillingPage() {
  const [currentPlan] = useState({
    name: "Pro Plan",
    price: 29,
    period: "month",
    status: "active",
    nextBilling: "2024-11-15",
    features: [
      "Unlimited email processing",
      "Advanced AI categorization",
      "Priority support",
      "Custom integrations"
    ]
  });

  const [usage] = useState({
    emailsProcessed: 1247,
    emailsLimit: 5000,
    apiCalls: 8923,
    apiLimit: 10000,
    storageUsed: 2.4,
    storageLimit: 10
  });

  const [billingHistory] = useState([
    {
      id: "INV-001",
      date: "2024-10-15",
      amount: 29.00,
      status: "paid",
      description: "Pro Plan - October 2024"
    },
    {
      id: "INV-002",
      date: "2024-09-15",
      amount: 29.00,
      status: "paid",
      description: "Pro Plan - September 2024"
    },
    {
      id: "INV-003",
      date: "2024-08-15",
      amount: 29.00,
      status: "paid",
      description: "Pro Plan - August 2024"
    }
  ]);

  const plans = [
    {
      name: "Free",
      price: 0,
      period: "month",
      features: [
        "Up to 100 emails/month",
        "Basic categorization",
        "Community support"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: 29,
      period: "month",
      features: [
        "Unlimited email processing",
        "Advanced AI categorization",
        "Priority support",
        "Custom integrations"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: 99,
      period: "month",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom AI models",
        "SLA guarantee"
      ],
      popular: false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Billing & Subscription
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your subscription, view usage, and handle billing information.
        </p>
      </div>

      {/* Current Plan */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-600" />
          <h2 className="text-2xl font-semibold">Current Plan</h2>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  {currentPlan.name}
                </CardTitle>
                <CardDescription>
                  Your active subscription plan
                </CardDescription>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                ${currentPlan.price}
                <span className="text-lg font-normal text-muted-foreground">/{currentPlan.period}</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Next billing</p>
                <p className="font-medium">{currentPlan.nextBilling}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">Plan Features</h4>
              <ul className="space-y-1">
                {currentPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
              <Button>
                Manage Subscription
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Overview */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <h2 className="text-2xl font-semibold">Usage Overview</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emails Processed</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usage.emailsProcessed.toLocaleString()}</div>
              <Progress value={(usage.emailsProcessed / usage.emailsLimit) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {usage.emailsProcessed} of {usage.emailsLimit.toLocaleString()} used
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Calls</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usage.apiCalls.toLocaleString()}</div>
              <Progress value={(usage.apiCalls / usage.apiLimit) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {usage.apiCalls} of {usage.apiLimit.toLocaleString()} used
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usage.storageUsed}GB</div>
              <Progress value={(usage.storageUsed / usage.storageLimit) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {usage.storageUsed}GB of {usage.storageLimit}GB used
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Available Plans */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-purple-600" />
          <h2 className="text-2xl font-semibold">Available Plans</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={plan.popular ? "border-primary" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.popular && (
                    <Badge>Most Popular</Badge>
                  )}
                </div>
                <div className="text-3xl font-bold">
                  ${plan.price}
                  <span className="text-lg font-normal text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={plan.name === currentPlan.name ? "secondary" : "default"}
                  disabled={plan.name === currentPlan.name}
                >
                  {plan.name === currentPlan.name ? "Current Plan" : "Upgrade"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-orange-600" />
          <h2 className="text-2xl font-semibold">Billing History</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>
              View and download your past invoices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {billingHistory.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Receipt className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{invoice.description}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                      <Badge
                        variant={invoice.status === "paid" ? "secondary" : "outline"}
                        className={invoice.status === "paid" ? "bg-green-100 text-green-800" : ""}
                      >
                        {invoice.status === "paid" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {invoice.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}