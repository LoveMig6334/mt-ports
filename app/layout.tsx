import type { Metadata } from "next";
import { Instrument_Serif, Space_Mono, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "THATT — Designer & Art Director",
    template: "%s — THATT",
  },
  description:
    "Portfolio of THATT — branding, UI/UX design, motion, typography, and art direction.",
  openGraph: {
    title: "THATT — Designer & Art Director",
    description:
      "Portfolio of THATT — branding, UI/UX design, motion, typography, and art direction.",
    siteName: "THATT",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${spaceMono.variable} ${instrumentSerif.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
