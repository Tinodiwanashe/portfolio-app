"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RootLayoutProps } from "./types/definitions";

export default function Template({ children }: RootLayoutProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }} 
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
