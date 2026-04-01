import type { Metadata, Viewport } from "next";
import { Caveat, DM_Sans, Geist, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";
import "./v2/v2.css";
import { site } from "@/data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-v2-hand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-v2-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${site.name} — Portfolio`,
  description: site.metaDescription,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${caveat.variable} ${dmSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-screen">
        <div className="portfolio-v2-scope relative min-h-screen w-full">{children}</div>
      </body>
    </html>
  );
}
