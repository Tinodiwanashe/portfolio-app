"use client";

import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import MagicButton from "./MagicButton";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    //"w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs"
    <footer className="w-full text-center text-xs border-t border-t-foreground/10 pt-8 pb-8" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
{/*         <Image
          src="/portfolio-app/public/footerGrid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        /> */}
      </div>

      <div className="flex flex-col items-center">
        <Link href="mailto:kandoromt1@outlook.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </Link>
      </div>

      
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © 2024 Munyaradzi Kandoro
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <div
              key={info.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </div>
          ))}
        </div>
{/*         Powered by{" "}
          <Link
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </Link> */}
      </div>
    </footer>
  );
};

 const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
  },
  {
    id: 2,
    img: "/twit.svg",
  },
  {
    id: 3,
    img: "/link.svg",
  },
];
