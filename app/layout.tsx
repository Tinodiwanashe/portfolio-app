import { Inter as FontSans } from "next/font/google"
import "./styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Head from "next/head";
import { RootLayoutProps } from "./types/definitions";
import { Metadata } from 'next'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata  = {
  metadataBase: new URL(defaultUrl),
  title: "Munyaradzi Kandoro Portfolio",
  description: "A Tech Enthusiast Portfolio Website"
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={cn("min-h-screen bg-background text-foreground font-sans antialiased",fontSans.variable)}>
        <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
