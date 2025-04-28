import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopCatalog - Next.js E-Commerce",
  description: "A small e-commerce product catalog built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 bg-gray-50">
              {children}
            </main>
            <footer className="py-6 bg-white border-t">
              <div className="container mx-auto px-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} ShopCatalog. All rights reserved.
              </div>
            </footer>
          </div>
        </ClientBody>
      </body>
    </html>
  );
}
