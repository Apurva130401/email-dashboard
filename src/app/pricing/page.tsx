"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Star, Zap, Shield, Users, Building, Minus } from "lucide-react";
import Link from 'next/link';
import Image from "next/image";

type PlanName = "Starter" | "Pro" | "Team" | "Enterprise";
type FeatureValues = Record<PlanName, string | boolean>;

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'annually'>('monthly');

  const plans: { name: PlanName; price: { monthly: string; annually: string; }; description: string; cta: string; popular?: boolean; buttonVariant: "default" | "outline"; }[] = [
    {
      name: "Starter",
      price: { monthly: "$0", annually: "$0" },
      description: "For individuals getting started.",
      cta: "Get Started Free",
      buttonVariant: "outline" as const,
    },
    {
      name: "Pro",
      price: { monthly: "$9", annually: "$7" },
      description: "For professionals needing advanced tools.",
      cta: "Get Started",
      popular: true,
      buttonVariant: "default" as const,
    },
    {
      name: "Team",
      price: { monthly: "$29", annually: "$23" },
      description: "For collaborating with your team.",
      cta: "Get Started",
      buttonVariant: "default" as const,
    },
    {
      name: "Enterprise",
      price: { monthly: "Custom", annually: "Custom" },
      description: "For large organizations with custom needs.",
      cta: "Contact Sales",
      buttonVariant: "outline" as const,
    },
  ];

  const featureCategories: { name: string; features: { name: string; values: FeatureValues }[] }[] = [
    {
      name: "Core Features",
      features: [
        { name: "Email volume", values: { Starter: "500/mo", Pro: "Unlimited", Team: "Unlimited", Enterprise: "Unlimited" } },
        { name: "AI categorization", values: { Starter: true, Pro: true, Team: true, Enterprise: true } },
        { name: "Email cleaning", values: { Starter: false, Pro: true, Team: true, Enterprise: true } },
        { name: "Calendar integration", values: { Starter: false, Pro: true, Team: true, Enterprise: true } },
      ]
    },
    {
      name: "AI Assistant - Nina",
      features: [
        { name: "Image Gen for Emails", values: { Starter: "5/mo", Pro: "20/mo", Team: "50/mo", Enterprise: "Unlimited" } },
        { name: "Smart draft replies", values: { Starter: true, Pro: true, Team: true, Enterprise: true } },
        { name: "Advanced AI Assistant", values: { Starter: false, Pro: true, Team: true, Enterprise: true } },
        { name: "Priority scheduling", values: { Starter: false, Pro: true, Team: true, Enterprise: true } },
        { name: "Email analytics", values: { Starter: false, Pro: true, Team: true, Enterprise: true } },
      ]
    },
    {
        name: "Team & Collaboration",
        features: [
            { name: "Team members", values: { Starter: "1", Pro: "1", Team: "Up to 5", Enterprise: "Unlimited" } },
            { name: "Personal dashboard", values: { Starter: true, Pro: true, Team: true, Enterprise: true } },
            
            { name: "Shared inbox", values: { Starter: false, Pro: false, Team: true, Enterprise: true } },
            { name: "Team analytics", values: { Starter: false, Pro: false, Team: true, Enterprise: true } },
            { name: "Admin dashboard", values: { Starter: false, Pro: false, Team: true, Enterprise: true } },
        ]
    },
    {
        name: "Support & Security",
        features: [
            { name: "Community support", values: { Starter: true, Pro: true, Team: true, Enterprise: true } },
            { name: "Priority support", values: { Starter: false, Pro: true, Team: true, Enterprise: true } },
            { name: "Phone & email support", values: { Starter: false, Pro: true, Team: true, Enterprise: true } },
            { name: "24/7 Support", values: { Starter: false, Pro: false, Team: true, Enterprise: true } },
    
        ]
    }
  ];

  const getCheckoutUrl = (plan: typeof plans[0]) => {
    if (plan.name === 'Enterprise') return '/contact';
    if (plan.name === 'Starter') return '/signup';

    const price = (billingCycle === 'monthly' ? plan.price.monthly : plan.price.annually).replace('$', '');
    
    let planId = '';
    if (plan.name === 'Pro') {
        planId = billingCycle === 'monthly' ? 'plan_RVlwkCh17EcZxY' : 'plan_RVlyW7vcLAmK9G';
    } else if (plan.name === 'Team') {
        planId = billingCycle === 'monthly' ? 'plan_RVlx2WEghPaAkR' : 'plan_RVlyy9WLSHtyyF';
    }

    return `/checkout?plan=${plan.name}&price=${price}&billing=${billingCycle}&plan_id=${planId}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/SyncFlo White BG.png" alt="SyncFlo Logo" width={40} height={40} />
              <span className="text-2xl font-bold text-slate-900">SyncFlo</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</Link>
              <Link href="/pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</Link>
              <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">About</Link>
              <Link href="/contact" className="text-slate-600 hover:text-slate-900 transition-colors">Contact</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-slate-600 hover:text-slate-900 transition-colors">Sign In</Link>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            The perfect plan for You
          </h1>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Choose the plan that best fits your needs and start streamlining your email workflow today.
          </p>

          <div className="flex items-center justify-center gap-4 mb-16">
            <span className={`font-semibold ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'annually' : 'monthly')} />
              <div className="w-14 h-8 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-slate-900"></div>
            </label>
            <span className={`font-semibold ${billingCycle === 'annually' ? 'text-slate-900' : 'text-slate-500'}`}>
              Annually <span className="text-sm text-green-500">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto pb-8">
          <table className="w-full max-w-7xl mx-auto border-collapse text-sm text-left">
            <thead className="sticky top-[73px] z-30 bg-white">
              <tr>
                <th className="w-1/3 p-4 font-bold text-lg text-slate-800">Features</th>
                {plans.map(plan => (
                  <th key={plan.name} className={`w-1/6 p-4 text-center ${plan.popular ? 'bg-slate-50 rounded-t-2xl' : ''}`}>
                    <h3 className="text-xl font-bold text-slate-800">{plan.name}</h3>
                    <p className="text-sm text-slate-500 h-10">{plan.description}</p>
                    <div className="text-4xl font-bold text-slate-900 my-4">
                      {plan.price[billingCycle]}
                      {plan.price.monthly !== 'Custom' && <span className="text-base font-normal text-slate-500">/month</span>}
                    </div>
                    <Button asChild variant={plan.buttonVariant} className={`w-full rounded-lg ${plan.popular ? 'bg-slate-900 hover:bg-slate-800' : ''}`}>
                      <Link href={getCheckoutUrl(plan)}>{plan.cta}</Link>
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureCategories.map(category => (
                <React.Fragment key={category.name}>
                  <tr>
                    <th colSpan={5} className="p-4 bg-slate-50 text-slate-700 font-bold text-lg">{category.name}</th>
                  </tr>
                  {category.features.map(feature => (
                    <tr key={feature.name} className="border-b border-slate-200">
                      <td className="p-4 text-slate-700">{feature.name}</td>
                      {plans.map(plan => (
                        <td key={`${plan.name}-${feature.name}`} className={`p-4 text-center ${plan.popular ? 'bg-slate-50' : ''}`}>
                          {typeof feature.values[plan.name as PlanName] === 'boolean' ? (
                            feature.values[plan.name as PlanName] ? <Check className="w-6 h-6 text-green-500 mx-auto" /> : <Minus className="w-6 h-6 text-slate-400 mx-auto" />
                          ) : (
                            <span className="font-semibold text-slate-800">{feature.values[plan.name as PlanName]}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
            <tfoot>
                <tr>
                    <td></td>
                    {plans.map(plan => (
                        <td key={plan.name} className={`p-4 text-center ${plan.popular ? 'bg-slate-50 rounded-b-2xl' : ''}`}>
                            <Button asChild variant={plan.buttonVariant} className={`w-full rounded-lg ${plan.popular ? 'bg-slate-900 hover:bg-slate-800' : ''}`}>
                                <Link href={getCheckoutUrl(plan)}>{plan.cta}</Link>
                            </Button>
                        </td>
                    ))}
                </tr>
            </tfoot>
          </table>
        </div>

      </main>

      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Image src="/SyncFlo White BG.png" alt="SyncFlo Logo" width={32} height={32} />
              <span className="text-xl font-bold">SyncFlo</span>
            </div>
            <div className="flex gap-8 text-slate-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 SyncFlo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PricingPage;