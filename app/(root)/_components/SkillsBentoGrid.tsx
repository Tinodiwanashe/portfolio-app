"use client"

import React, { Suspense } from 'react'

import { FaLocationArrow, FaShield } from 'react-icons/fa6';
import {SkillsCloud} from './SkillsCloud';
import {Location} from './Location';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import BlurFade from '@/components/ui/blur-fade';
import { BLUR_FADE_DELAY } from '@/app/types/constants';
import Ecosystems from './Ecosystems';

  
  const features = [
    {
      Icon: <FaShield/>,
      name: "My Skills",
      description: "These are some to the technologies and and frameworks I have used on my journey.",
      href: "/",
      cta: "Learn more",
      background: <SkillsCloud/>,
      className: "col-span-3 lg:col-span-2 row-span-2"
    },
    {
      Icon: <FaLocationArrow/>,
      name: "My Skill Ecosystems",
      description: "Outsystems a low-code tool enable developers to integrate multible programming languages.",
      href: "/",
      cta: "Learn more",
      background: <Ecosystems/>,
      className: "col-span-3 lg:col-span-1 row-span-1"
    },
    {
      Icon: <FaLocationArrow/>,
      name: "My Location",
      description: "I am currently based in South Africa.",
      href: "/",
      cta: "Learn more",
      background: <Location/>,
      className: "col-span-3 lg:col-span-1 row-span-1  "
    },    
  ]

const SkillsBentoGrid = () => {
  return (
    <section id="skills" className="container  ">
      <BlurFade delay={BLUR_FADE_DELAY * 11}>
        <div className="max-w-full mx-auto pb-20 px-4 md:px-8 lg:px-10">
            <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
                My Skills
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
                I&apos;ve acquired a variety of skills, from simple
                HTML to complex javscript frameworks like next.js. Here are a few of my
                favorites.
            </p>
        </div>
      </BlurFade>
      <BentoGrid className="grid-rows-2 grid-flow-col">
      {features.map((feature,index) => (
        <BentoGridItem 
          key={index}
          title={feature.name}
          description={feature.description}
          header={feature.background}
          className={feature.className}
          icon={feature.Icon}
        />
      ))}
    </BentoGrid>   
    </section>
  )
}

export default SkillsBentoGrid