/* Base layout */

import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { CursorProvider } from "@/components/cursor-context";
import CustomCursor from "@/components/custom-cursor";
import "./globals.css";

/* Fonts */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

/* Metadata */
export const metadata: Metadata = {
  title: "Neeha Ravula",
  keywords: ["Neeha Ravula", "Portfolio"],
  description:
    "Developer and creative based in New York, NY, exploring the intersection of design and computation.",
};

/* Root layout */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Clear any saved theme override before next-themes' own init
            script runs, so every fresh page load always resolves the theme
            from the current system preference instead of a stale manual
            choice from a previous visit. The toggle still works normally
            within a visit - this only resets on a fresh load. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try { localStorage.removeItem("theme"); } catch (e) {}`,
          }}
        />
        <link rel="stylesheet" href="https://use.typekit.net/smn7zyq.css" />
        <link
          rel="dns-prefetch"
          href="https://f6ciazohrats9a1e.public.blob.vercel-storage.com"
        />
        <link
          rel="preconnect"
          href="https://f6ciazohrats9a1e.public.blob.vercel-storage.com"
        />
      </head>
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} font-content bg-background text-primary antialiased flex min-h-screen flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CursorProvider>
            <CustomCursor />
            <Nav />
            {children}
            <Footer />
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
