import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Apex Residences | Ultra-Luxury Real Estate Dubai',
  description: 'Precision, Performance, and Due Diligence. Discover your signature address with Apex Residences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;700&family=Inter:wght@300;400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-black">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
