import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0c1a30',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bunchandco.in'),
  title: {
    default: 'BUNCH & CO. — Good finds for everyday life',
    template: '%s | BUNCH & CO.',
  },
  description:
    'BUNCH & CO. is an online product catalogue bringing curated everyday essentials to Kerala. Browse quality home and car products and order directly through WhatsApp.',
  keywords: [
    'BUNCH & CO.',
    'online shopping Kerala',
    'water tank filter bag',
    'MOJILA 5-micron filter',
    'car seat hanger',
    'home essentials Kerala',
    'car accessories Kerala',
    'WhatsApp order shopping',
  ],
  authors: [{ name: 'BUNCH & CO.' }],
  creator: 'BUNCH & CO.',
  publisher: 'BUNCH & CO.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'BUNCH & CO. — Good finds for everyday life',
    description: 'Curated everyday products delivered across Kerala. Order via WhatsApp.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'BUNCH & CO.',
    images: [
      {
        url: '/images/logo/logo-navy.webp',
        width: 600,
        height: 200,
        alt: 'BUNCH & CO. Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BUNCH & CO. — Good finds for everyday life',
    description: 'Curated everyday products delivered across Kerala. Order via WhatsApp.',
    images: ['/images/logo/logo-navy.webp'],
  },
};

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BUNCH & CO.',
  description: 'Good finds for everyday life. Curated online product catalogue for Kerala.',
  logo: 'https://bunchandco.in/images/logo/logo-navy.webp',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-89212-67174',
    contactType: 'customer service',
    availableLanguage: ['English', 'Malayalam', 'Hindi'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Sans+Malayalam:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body>
        <LanguageProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
