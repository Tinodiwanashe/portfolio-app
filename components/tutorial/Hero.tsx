import React from 'react'

import { TextGenerateEffect } from '../ui/text-generate-effect'
import { FaPhone, FaDownload } from 'react-icons/fa6'
import { FlipWords } from '../ui/flip-words'
import { Button } from '../ui/button'
import HeroImage from './HeroImage'
import Stats from '../Stats'
import { RainbowButton } from '../ui/rainbow-button'

const words = [
  {
    text: "Hi,"
  },
  {
    text: "I'm"
  },
  {
    text: "Munya!",
    className: "text-primary"
  },
];

const words_ = ["Outsystems", "Next.js", ".Net"];

const Hero = () => {
  return (
    <section className=" container m-auto h-full w-full relative z-10">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className='order-2 xl:order-none'>
          

          
          {/**
           *  Link: https://ui.aceternity.com/components/text-generate-effect
           *
           *  change md:text-6xl, add more responsive code
           */}                   
          <TextGenerateEffect
            words="Hi, I'm Munya!"
            className="mt-6 text-[60px] md:text-5xl lg:text-6xl"
          />
          <h2 className='text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-left'>
            Specializing in<FlipWords words={words_} className='text-pink-600'/><br />
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-400 flex-1">
            I excel at crafting seamless digital experiences and I am a proficient in various programming languages and technologies.
          </p>
          <div className='mt-10 flex flex-col xl:flex-row items-center gap-2'>
            <Button variant={'default'} size={'lg'}>
              Download CV <FaDownload className='ml-2 h-4 w-4'/>
            </Button>
            <Button variant={'outline'} size={'lg'}>
              Contact me <FaPhone className='ml-2 h-4 w-4'/>
            </Button>
          </div>
        </div>
        <HeroImage className='order-1 xl:order-none mb-8 xl:mb-0'/>
        <div>

        </div>
      </div>
      <Stats/>
    </section>
  )
}

export default Hero