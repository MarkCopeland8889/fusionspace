import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FusionSpace - AI-Powered Web App Builder',
  description: 'Build modern web apps, dashboards, landing pages, and business websites instantly with AI. No coding required.',
  keywords: 'AI, web builder, website builder, app builder, no-code, React, Next.js',
  authors: [{ name: 'Colton Scott' }],
  creator: 'FusionSpace',
  publisher: 'FusionSpace',
  robots: 'index, follow',
  openGraph: {
    title: 'FusionSpace - AI-Powered Web App Builder',
    description: 'Build modern web apps, dashboards, landing pages, and business websites instantly with AI.',
    url: 'https://fusionspace.net',
    siteName: 'FusionSpace',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FusionSpace - AI-Powered Web App Builder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FusionSpace - AI-Powered Web App Builder',
    description: 'Build modern web apps, dashboards, landing pages, and business websites instantly with AI.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  )
} 