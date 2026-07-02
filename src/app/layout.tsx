import type { Metadata } from "next";
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { CookieConsent } from "@/components/cookie-consent";

import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hiverobotics.fr"),
  title: "Hive Robotics · Robots de livraison autonomes conçus en France",
  description:
    "Hive Robotics conçoit et fabrique des robots de livraison autonomes : jusqu'à 250 kg de charge, 50 km d'autonomie, navigation LiDAR + IA. Déployés sur aéroports, campus, entrepôts et résidences.",
  keywords: [
    "robot autonome",
    "robot de livraison",
    "livraison autonome",
    "robotique française",
    "Hive Robotics",
  ],
  openGraph: {
    title: "Hive Robotics · Robots de livraison autonomes conçus en France",
    description:
      "Des robots de livraison autonomes, souverains et fabriqués en France. Jusqu'à 250 kg de charge et 50 km d'autonomie.",
    type: "website",
    locale: "fr_FR",
    siteName: "Hive Robotics",
    url: "https://hiverobotics.fr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hive Robotics · Robots de livraison autonomes conçus en France",
    description:
      "Des robots de livraison autonomes, souverains et fabriqués en France. Jusqu'à 250 kg de charge et 50 km d'autonomie.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"

      className={`${instrumentSerif.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#1B3D2C] focus:text-white focus:rounded-lg focus:font-semibold"
        >
          Aller au contenu principal
        </a>
        {/* Noise texture overlay */}
        <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.015]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <Navbar />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
