'use client'

import { useState } from 'react'
import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'admin@fusionspace.net',
      href: 'mailto:admin@fusionspace.net',
      description: 'Send us an email anytime'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: '(864) 392-3861',
      href: 'tel:+18643923861',
      description: 'Call us during business hours'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      value: 'Clemson, South Carolina',
      href: '#',
      description: 'Based in the heart of Clemson'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Business Hours',
      value: 'Mon-Fri: 9AM-6PM EST',
      href: '#',
      description: 'We\'ll respond within 24 hours'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Get in Touch
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg leading-8 text-gray-600">
            Have a question, need support, or want to discuss your next project? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-blue-600 bg-blue-100 rounded-lg">
                {info.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
              <a
                href={info.href}
                className="text-blue-600 hover:text-blue-700 transition-colors block mb-1"
              >
                {info.value}
              </a>
              <p className="text-sm text-gray-600">{info.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-900">Send us a Message</h2>
            </div>
            <p className="text-lg text-gray-600">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          {formSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <div className="text-green-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-2">Message Sent!</h3>
              <p className="text-green-700 mb-4">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-green-600 hover:text-green-700 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <iframe
                src="https://forms.gle/Ex4XNDgwE3zYe8Zv5"
                width="100%"
                height="600"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Contact Form"
                className="rounded-lg"
              >
                Loading…
              </iframe>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Having trouble with the form? You can also email us directly at{' '}
                  <a
                    href="mailto:admin@fusionspace.net"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    admin@fusionspace.net
                  </a>
                </p>
              </div>
            </div>
          )}
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
                How quickly do you respond to inquiries?
              </h3>
              <p className="text-gray-600">
                We typically respond to all inquiries within 24 hours during business days. 
                For urgent matters, feel free to call us directly.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer custom development services?
              </h3>
              <p className="text-gray-600">
                Yes! While FusionSpace is designed to be self-service, we do offer custom 
                development and consulting services for complex projects.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I schedule a demo or consultation?
              </h3>
              <p className="text-gray-600">
                Absolutely! We'd be happy to walk you through FusionSpace and discuss how 
                it can help with your specific needs. Just let us know in your message.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What if I need technical support?
              </h3>
              <p className="text-gray-600">
                For technical support, you can reach out through this contact form or email 
                us directly. We also have comprehensive documentation and help resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-blue-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Don't wait to bring your ideas to life. Start building with FusionSpace today 
            and see the difference AI-powered development can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/sign-up"
              className="inline-flex items-center justify-center px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Building Free
            </a>
            <a
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 