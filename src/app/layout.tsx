import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import AuthProvider from '@/components/auth/AuthProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DiggIndie',
  description: '인디밴드 디깅 올인원 플랫폼, DiggIndie',
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
  themeColor: '#000000',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-black`}
      >
        <AuthProvider>
          <main className="w-full max-w-[375px] mx-auto min-h-screen bg-black flex flex-col shadow-2xl">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
