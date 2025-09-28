import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChronoCanvas - Decentralized Video Creation & Asset Marketplace',
  description: 'AI-powered video creation and asset marketplace on Base network',
  keywords: ['video creation', 'AI', 'blockchain', 'NFT', 'Base', 'decentralized'],
  authors: [{ name: 'ChronoCanvas Team' }],
  openGraph: {
    title: 'ChronoCanvas',
    description: 'Decentralized Video Creation & Asset Marketplace, Powered by AI',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
