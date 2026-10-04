import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { ReduxProvider } from "@/redux/provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import GlobalConciergeWidget from "@/components/Concierge";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                FONTS SETUP                                 */
/* -------------------------------------------------------------------------- */

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/* -------------------------------------------------------------------------- */
/*                                SEO METADATA                                */
/* -------------------------------------------------------------------------- */

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "EBIN TAXI | Executive Chauffeur & Urban Dispatch",
    template: "%s | Ebin Taxi - Premium Mobility",
  },
  description:
    "Tamil Nadu's premier executive ride-hailing and chauffeur service. Transparent fixed pricing, flight telemetry tracking, pristine fleet, and 24/7 priority concierge dispatch.",
  keywords: [
    "Executive Taxi",
    "Chauffeur Service Tamil Nadu",
    "Chennai Airport Taxi",
    "Outstation Cab Booking",
    "Corporate Fleet Rental",
    "VIP Transit",
    "Ebin Taxi",
  ],
  authors: [{ name: "Ebin Taxi Dispatch Ltd." }],
  creator: "Ebin Taxi",
  publisher: "Ebin Mobility Solutions",
  metadataBase: new URL("https://ebintaxi.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EBIN TAXI | Executive Chauffeur & Urban Dispatch",
    description:
      "Safe, verified, and transparent luxury transit across 38 districts of Tamil Nadu. Book in seconds with zero surge pricing.",
    url: "https://ebintaxi.com",
    siteName: "Ebin Taxi",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Ebin Taxi Executive Fleet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EBIN TAXI | Executive Chauffeur & Urban Dispatch",
    description:
      "Reliable executive transportation across Tamil Nadu with zero surge guarantee.",
    images: ["https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200"],
    creator: "@ebintaxi",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

/* -------------------------------------------------------------------------- */
/*                               ROOT LAYOUT                                  */
/* -------------------------------------------------------------------------- */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(jakarta.variable, jetbrainsMono.variable, "scroll-smooth")}
    >
      <body
        className={cn(
          "min-h-screen font-sans bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 antialiased selection:bg-amber-500/30 selection:text-amber-900 dark:selection:text-amber-100 overflow-x-hidden flex flex-col justify-between transition-colors duration-300"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            {/* Main Application Viewport */}
            <div className="relative flex min-h-screen flex-col">
              {children}
            </div>

            {/* Global Floating Concierge & Callback Form */}
            <GlobalConciergeWidget />

            {/* Toast Notifications */}
            <Toaster
              position="top-center"
              richColors
              closeButton
              toastOptions={{
                className:
                  "rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl font-sans",
              }}
            />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}