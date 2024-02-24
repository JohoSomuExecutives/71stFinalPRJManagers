import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Noto_Sans_JP } from 'next/font/google';
import { getFirebaseApp } from './lib/firebase/config';

const inter = Inter({ subsets: ['latin'] });
const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '最終企画者フォーム',
  description: '最終企画者フォームのテスト',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body className={notoSansJP.className}>
        {children}
      </body>
    </html>
  );
}
