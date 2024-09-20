

import { Inter as FontSans } from "next/font/google"
import "./styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Head from "next/head";
import { RootLayoutProps } from "./types/definitions";
import { Metadata } from 'next';
import { ConvexClientProvider } from "./ConvexClientProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata  = {
  title: "Munyaradzi Kandoro Portfolio",
  description: "A Tech Enthusiast Portfolio Website"
};

export default function RootLayout({ children }: RootLayoutProps) {
/*   async function getTheme() {
    'use server'
    const {theme} = useTheme();
    return theme;
    // ...
  } */
  
 
/*   useEffect(() => {
    const fetchTheme = async () => {
      setNextTheme(useTheme());
    }
 
    fetchTheme().catch((e) => {
      // handle the error as needed
      console.error('An error occurred while fetching the data: ', e)
    })
  }, [])
 */


  return (
    <ConvexClientProvider>
      <html lang="en" suppressHydrationWarning>
        <Head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>
        <body className={cn("min-h-screen w-full flex flex-col bg-background text-foreground font-sans antialiased",fontSans.variable)}>
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
    </ConvexClientProvider>
  );
}
