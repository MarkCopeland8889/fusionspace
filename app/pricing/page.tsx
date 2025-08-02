'use client'

import { useState } from 'react'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import { Check, X, Star, Zap, Crown, Users } from 'lucide-react'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for getting started',
      features: [
        'Up to 2 projects',
        '10 AI messages per day',
        '50 AI messages per month',
        'Basic templates',
        'Community support'
      ],
      limitations: [
        'No custom domain',
        'No hosting privileges',
        'No advanced AI features',
        'FusionSpace badge visible'
      ],
      buttonText: 'Start Free',
      buttonVariant: 'outline' as const,
      popular: false
    },
    {
      name: 'Plus',
      price: billingCycle === 'monthly' ? 20 : 200,
      description: 'Great for growing businesses',
      features: [
        'Unlimited projects',
        '30 AI messages per day',
        '150 AI messages per month',
        'Custom domain',
        'Hosting privileges',
        'Advanced AI features (coming soon)',
        'Priority support',
        'No FusionSpace badge'
      ],
      limitations: [],
      buttonText: 'Start Plus',
      buttonVariant: 'primary' as const,
      popular: true
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? 50 : 500,
      description: 'For power users and teams',
      features: [
        'Everything in Plus',
        'Unlimited AI messages (up to 300/month)',
        'Team collaboration',
        'Advanced analytics',
        'API access',
        'White-label options',
        'Dedicated support',
        'Custom integrations'
      ],
      limitations: [],
      buttonText: 'Start Pro',
      buttonVariant: 'primary' as const,
      popular: false
    }
  ]

  const enterpriseFeatures = [
    'Custom pricing based on your needs',
    'Unlimited everything',
    'Dedicated account manager',
    'Custom integrations',
    'SLA guarantees',
    'On-premise deployment options',
    'Custom training and onboarding'
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Simple, Transparent Pricing
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg leading-8 text-gray-600">
            Choose the plan that's right for you. Start free and upgrade as you grow.
          </p>
          
          {/* Billing Toggle */}
          <div className="mt-8 flex items-center justify-center space-x-4">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === 'yearly' ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
              <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Save 17%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-sm border-2 p-8 ${
                plan.popular ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  {plan.price > 0 && (
                    <span className="text-gray-600">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  )}
                </div>
                
                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.buttonVariant === 'primary'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
              
              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <li key={limitationIndex} className="flex items-start">
                      <X className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-500">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Crown className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Enterprise Solutions</h2>
            <p className="text-lg text-gray-600 mb-8">
              Need something custom? We offer tailored solutions for large organizations and teams.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg p-6 text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise Features</h3>
              <ul className="space-y-3">
                {enterpriseFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-left">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Perfect For</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Users className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Large teams and organizations</span>
                </li>
                <li className="flex items-start">
                  <Zap className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">High-volume projects</span>
                </li>
                <li className="flex items-start">
                  <Star className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Custom requirements</span>
                </li>
                <li className="flex items-start">
                  <Crown className="w-5 h-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Premium support needs</span>
                </li>
              </ul>
            </div>
          </div>
          
          <a
            href="https://forms.gle/Ex4XNDgwE3zYe8Zv5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Contact Sales
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change my plan at any time?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens if I exceed my AI message limit?
              </h3>
              <p className="text-gray-600">
                You'll be notified when you're close to your limit. You can either upgrade your plan or wait for the next reset period.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your payment.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a setup fee?
              </h3>
              <p className="text-gray-600">
                No setup fees! All plans include immediate access to all features. You only pay the listed price.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-blue-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already building amazing projects with FusionSpace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/sign-up"
              className="inline-flex items-center justify-center px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Building Free
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 