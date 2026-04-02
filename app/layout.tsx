// app/layout.tsx
// Root layout — wraps all pages with nav, footer, and metadata

import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import SocialDock from "@/components/layout/SocialDock";
import ScrollWheel from "@/components/layout/ScrollWheel";
import { cn } from "@/lib/utils";
import SmoothScrolling from "@/components/layout/SmoothScrolling";
import { ThemeProvider } from "@/components/theme-provider";

// ── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Swagata Ganguly — ECE Engineer & Builder",
    template: "%s | Swagata Ganguly",
  },
  description:
    "ECE student, systems builder, and programmer. I build robots, embedded systems, and software that works in the real world.",
  keywords: [
    "Swagata Ganguly",
    "ECE student",
    "Arduino",
    "embedded systems",
    "robotics",
    "programmer",
    "portfolio",
    "West Bengal",
  ],
  authors: [{ name: "Swagata Ganguly" }],
  creator: "Swagata Ganguly",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://swagata.dev",
    siteName: "Swagata Ganguly",
    title: "Swagata Ganguly — ECE Engineer & Builder",
    description: "I build robots, embedded systems, and software that works in the real world.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Swagata Ganguly Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swagata Ganguly — ECE Engineer & Builder",
    description: "I build robots, embedded systems, and software that works in the real world.",
    creator: "@swagata_dev",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-text antialiased transition-colors duration-500",
          "font-sans selection:bg-gold-faint selection:text-gold"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" disableTransitionOnChange>
          <ScrollWheel />
          <SmoothScrolling>
            <LoadingScreen>
              {/* Navigation */}
              <Navbar />

              {/* Main content */}
              <main className="relative">{children}</main>

              {/* Footer */}
              <Footer />
            </LoadingScreen>

            {/* Social Dock */}
            <SocialDock />
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}
