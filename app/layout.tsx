import type { Metadata } from 'next';
import { Gothic_A1, M_PLUS_2, Noto_Sans_SC } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';

const gothic = Gothic_A1({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-gothic-a1',
});

const mplus = M_PLUS_2({
  weight: ['400'],
  subsets: ['latin', 'vietnamese', 'latin-ext'],
  variable: '--font-mplus-2',
});

const noto = Noto_Sans_SC({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-noto-sc',
});

// TODO: 메타데이터 전체 수정
export const metadata: Metadata = {
  title: 'Kobridge',
  description: 'next.js pwa',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/pwa/192x192.png',
    apple: '/icons/pwa/512x512.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${gothic.variable} ${mplus.variable} ${noto.variable}`}
    >
      <body className="antialiased font-sans bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
