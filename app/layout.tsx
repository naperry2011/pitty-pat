import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pitty Pat Card Game - Play Free Online | No Download Required',
  description: 'Play Pitty Pat online free! The classic card matching game with no ads or downloads. Challenge the computer in this fast-paced, easy-to-learn card game.',
  keywords: 'pitty pat, card game, online game, free game, play pitty pat online, pitty pat rules, card matching game',
  authors: [{ name: 'Pitty Pat Games' }],
  openGraph: {
    title: 'Pitty Pat Card Game - Play Free Online',
    description: 'The only place to play Pitty Pat online! Fast, free, and fun card matching game.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Pitty Pat Card Game'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pitty Pat Card Game - Play Free Online',
    description: 'The classic card matching game is now online! Play free with no downloads.',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  robots: 'index, follow'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}