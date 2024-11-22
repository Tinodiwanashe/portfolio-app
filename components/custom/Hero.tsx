"use client";

import { TextGenerateEffect } from '../ui/text-generate-effect'
import { FaPhone, FaDownload } from 'react-icons/fa6'
import { FlipWords } from '../ui/flip-words'
import { Button, buttonVariants } from '../ui/button'
import HeroImage from './HeroImage'
import Stats from './Stats'
import { convexQuery } from '@convex-dev/react-query'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/convex/_generated/api'
import { SubmitButton } from './submitFormButton';
import { LoadingButton } from './loading-button';
import { useState } from 'react';
import Link from 'next/link';
import SocialMediaIcon from './SocialMediaIcon';
import { SocialLinkObject } from '@/convex/helpers';

type FileProps = {
  name: string | undefined; 
  url: string | null | undefined;
}

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
  const [isDownloadPending, setIsDownloadPending] = useState(false);

  const fileName = "Munyaradzi Kandoro Resume.pdf"
  const resume = useQuery(convexQuery(api.files.getFileByName,{fileName}));
  const socialLinks = useQuery(convexQuery(api.users.getUserSocialLinks,{name: "Munyaradzi Kandoro"}));
  console.log("Retrieve file: ", resume.data);

  const fileInfo = {
    name: resume.data?.[0].file?.name,
    url: resume.data?.[2].url
  }


  return (
    <section className="flex flex-col container mx-auto h-dvh ">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 items-center">
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
            Specializing in<FlipWords words={words_} className='text-pink-600'/>
            <br />
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-400 flex-1">
            I excel at crafting seamless digital experiences and I am a proficient in various programming languages and technologies.
          </p>
          <div className='mt-10 flex flex-col xl:flex-row items-center gap-2'>
            <LoadingButton 
              type="submit"
              variant={'default'}
              size={'lg'}
              loadingText='downloading...'
              onClick={() => {
                setIsDownloadPending(true);
                downloadFile(fileInfo);
                setIsDownloadPending(false);
              }} 
              isLoading={isDownloadPending}>
              Download CV <FaDownload className='ml-2 h-4 w-4'/>
            </LoadingButton>
            <Link 
              href={`/contact`}
              className={buttonVariants({ variant: "outline", size: 'lg' })}           
            >
              Contact me <FaPhone className='ml-2 h-4 w-4'/>
            </Link>
          </div>
          {
            socialLinks.data &&
            <div className="mt-5 w-full flex flex-1 items-center gap-3 ">
              {
                socialLinks.data.map((item: SocialLinkObject, index: number) => {
                  return (
                    <SocialMediaIcon key={index} url={item.value}/>
                  )
                })
              }
            </div>            
          }
        </div>
        <HeroImage className='order-1 xl:order-none mb-8 xl:mb-0'/>
      </div>

    </section>
  )
}

export default Hero

const downloadFile = async (file: FileProps) => {
  console.log("File to download: ", file);
  if (file.url) {
    const response = await fetch(file.url);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name || "Dummy.txt"; // Replace with your file name and extension
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
};