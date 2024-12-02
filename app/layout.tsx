import "./styles/globals.css"; //import the globals.css stylesheet to apply the styles to every route in your application.
import './styles/prosemirror.css';
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { RootLayoutProps } from "./types/definitions";
import { Metadata } from 'next';
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";
import InfoDialog from "@/components/custom/InfoDialog";
import ConfirmationDialog from "@/components/custom/ConfirmationDialog";
import React from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata  = {
  title: {
    template: '%s | Portfolio',
    default: 'Munyaradzi Kandoro Portfolio'
  },
  description: "A Tech Enthusiast Portfolio Website",
  //metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
  icons: {
    icon: '/favicon.ico'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
};
//The %s in the template will be replaced with the specific page title. -----Is redirect working

export default function RootLayout({ children }: RootLayoutProps) {

  return (  
      <html lang="en" className='scroll-smooth antialiased' suppressHydrationWarning>
        <body className={cn("min-h-screen flex flex-col bg-background text-foreground font-sans",fontSans.variable)}>
          <ConvexClientProvider>
            <ThemeProvider
                  attribute="class"
                  defaultTheme="dark"
                  enableSystem
                  disableTransitionOnChange
            >
{/*               <div className="main">
                  <div className="gradient"/>
              </div>   */}            

              {children}
              <InfoDialog />
              <ConfirmationDialog/>
              <Toaster richColors/>
            </ThemeProvider>
          </ConvexClientProvider>
        </body>
      </html>   
  );
}
