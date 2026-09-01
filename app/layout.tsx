/* Base layout */

import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
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
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} font-content bg-background text-primary antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Nav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
