import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Haveli & Hearth | Exceptional Indian Dining Right on the Highway',
  description: 'Authentic 24-hour slow-cooked Dal Makhani, clay-tandoor delicacies, Awadhi dum biryanis, and luxury heritage suites upstairs on the National Highway.',
  keywords: ['indian highway restaurant', 'luxury dhaba', 'haveli dining', 'tandoor', 'highway room booking', 'destination restaurant India'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className="min-h-screen bg-[#140e0b] text-[#f4ede4] antialiased selection:bg-[#e05320]/30 selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
