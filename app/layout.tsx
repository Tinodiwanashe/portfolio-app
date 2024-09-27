

import { Inter as FontSans } from "next/font/google"
import "./styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { RootLayoutProps } from "./types/definitions";
import { Metadata } from 'next';
import { ConvexClientProvider } from "@/components/ui/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

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
  }
};
//The %s in the template will be replaced with the specific page title. -----Is redirect working

export default function RootLayout({ children }: RootLayoutProps) {

  return (  
      <html lang="en" suppressHydrationWarning>
        <body className={cn("min-h-screen w-full flex flex-col bg-background text-foreground font-sans antialiased",fontSans.variable)}>
          <Toaster />
          <ConvexClientProvider>
            <ThemeProvider
                  attribute="class"
                  defaultTheme="dark"
                  enableSystem
                  disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ConvexClientProvider>
        </body>
      </html>   
  );
}
