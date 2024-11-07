"use client";

import { SidebarNav } from "./_components/side-nav"
import { Separator } from "@/components/ui/separator"
import { sidebarNavItems } from "@/app/types/data"
import { useAuthUser } from "@/hooks/useAuthUser"
import { AuthRequiredError } from "@/lib/exceptions"
import { SignedIn } from "@clerk/nextjs"
import { motion } from "framer-motion";

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const { isLoading, isAuthenticated, userId } = useAuthUser();
  if (isLoading===false && !isAuthenticated) {
    throw new AuthRequiredError();
  }
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-full">
            <SignedIn>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.75 }} 
              >
                <div className="py-4 font-bold bg-primary text-center mb-4">
                  This is a protected page that you can only see as an authenticated
                  user
                </div>
                {children}
              </motion.div>
            </SignedIn>
            </div>
        </div>
      </div>
    </>
  )
}