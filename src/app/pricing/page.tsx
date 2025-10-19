
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from 'next/link';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: "Basic",
      price: "$10",
      features: [
        "Email Categorization",
        "Inbox Cleaning",
        "Draft Replies",
        "Calendar Integration",
      ],
    },
    {
      name: "Pro",
      price: "$25",
      features: [
        "Everything in Basic",
        "Advanced AI Features",
        "Priority Support",
        "Integration with 5 apps",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Everything in Pro",
        "Dedicated Account Manager",
        "Custom Integrations",
        "On-premise hosting",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Choose Your Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-4xl font-bold">{plan.price}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6">
                <Link href="/checkout" passHref>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
