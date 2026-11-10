import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Wholesale | Ranzo Hardware", template: "%s | Ranzo Hardware" },
  description: "Ranzo Hardware wholesale: design sandbox.",
  robots: { index: false, follow: false },
};

// The stand-in storefront chrome (components/SiteHeader.tsx, SiteFooter.tsx)
// is deliberately not rendered: the brief says this page carries no storefront
// navigation, only the logo, the one button and a legal footer. The page
// brings its own slim top bar and footer (LandingHeader, LandingFooter).
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-clip bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
