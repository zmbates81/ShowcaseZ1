import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "./components/ui/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const title = "How to Read an Insurer's P&L — An Interactive Field Guide";
const description =
  "Insurance is the only business that sells its product before it knows what it costs. An interactive field guide to reading an insurer's P&L — the combined ratio, the float, and the two engines of profit. Featuring Buckeye Mutual.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "insurance P&L",
    "combined ratio",
    "loss ratio",
    "expense ratio",
    "underwriting profit",
    "insurance float",
    "how to read an income statement",
    "property and casualty insurance",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    siteName: "How to Read an Insurer's P&L",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  authors: [{ name: "A field guide" }],
};

export const viewport: Viewport = {
  themeColor: "#0C1B2A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
