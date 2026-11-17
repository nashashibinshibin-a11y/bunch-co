import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'BUNCH & CO. — Good finds for everyday life',
    template: '%s | BUNCH & CO.',
  },
  description:
    'BUNCH & CO. is an online product catalogue bringing curated everyday essentials to Kerala. Order easily through WhatsApp.',
  keywords: ['BUNCH & CO.', 'online shopping', 'Kerala', 'home essentials', 'everyday products'],
  openGraph: {
    title: 'BUNCH & CO. — Good finds for everyday life',
    description: 'Curated everyday products delivered across Kerala. Order via WhatsApp.',
    type: 'website',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Sans+Malayalam:wght@400;500;600;700&display=swap"
          rel="stylesheet"
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
