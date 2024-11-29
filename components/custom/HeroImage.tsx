"use client"

import { motion } from 'framer-motion'
import React from 'react'
import Image from 'next/image'; 
import { cn } from '@/lib/utils';

const HeroImage = ({
    className,
  }: {
    className?: string;
  }) => {
  return (
    <div className={cn("w-full h-full relative flex items-center justify-center", className)}>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
                opacity: 1, 
                transition: {delay: 2, duration: 0.4, ease: "easeIn"}
            }}
        >
            {/* image */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ 
                    opacity: 1, 
                    transition: {delay: 2, duration: 2.4, ease: "easeInOut"}
                }}            
                className='w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] absolute dark:mix-blend-lighten'
            >
                <Image 
                    src="/assets/IMGHero.png"
                    alt='User Image'
                    priority
                    quality={100}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className='object-contain rounded-full size-full'
                />
            </motion.div>

            {/* circle */}
            <motion.svg 
                className="w-[300px] xl:w-[506px] h-[300px] xl:h-[506px]"
                fill="transparent"
                viewBox="0 0 506 506"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.circle 
                    cx="253" 
                    cy="253" 
                    r="250" 
                    stroke="#CBACF9" 
                    strokeWidth="4" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    initial = {{
                        strokeDasharray: "24 10 0 0"
                    }}
                    animate = {{
                        strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                        rotate: [120,360]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse"

                    }} 
                />     
            </motion.svg>
        </motion.div>
    </div>
  )
}

export default HeroImage