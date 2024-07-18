import {
    FaUser,
    FaHome,
    FaFilePdf,
    FaLinkedin,
    FaPhone,
    FaFilePowerpoint,
    FaTwitter,
    FaGithub,
    FaYoutube,
    FaUserAstronaut,
  } from 'react-icons/fa';

  export const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <FaHome className="h-[1.2rem] w-[1.2rem]"/>,
      hasProductItem: true,
      SubMenu: [
/*         {
          title: "Tailwind Master Kit",
          href: "https://tailwindmasterkit.com",
          src: "https://assets.aceternity.com/demos/tailwindmasterkit.webp",
          icon: <FaHome/>,
          description: "Prepare for tech interviews like never before."   
        },
        {
          title: "Rogue",
          href: "https://userogue.com",
          src: "https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png",
          icon: <FaHome/>,
          description: "Respond to government RFPs, RFIs and RFQs 10x faster using AI"   
        } */
      ]
    },
    {
      name: "Experience",
      href: "/experience",
      icon: <FaUserAstronaut className="h-[1.2rem] w-[1.2rem]"/>,
      hasProductItem: false,
      SubMenu: []
    },
    {
      name: "Resume",
      href: "/resume",
      icon: <FaFilePdf className="h-[1.2rem] w-[1.2rem]"/>,
      hasProductItem: false,
      SubMenu: [
/*         {
          title: "About Us",
          href: "/about",
          src: "https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png",
          icon: <FaUser/>,
          description: "Learn more about us"   
        }, {
          title: "About our team",
          href: "/about",
          src: "https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png",
          icon: <FaUser/>,
          description: "Learn more about us"   
        } */
      ]
    },
    {
      name: "Contact me",
      href: "/contact",
      icon: <FaPhone className="h-[1.2rem] w-[1.2rem]"/>,
      hasProductItem: false,
      SubMenu: []
    },
  ];

  export const socials = [
    {
      name: "Github",
      href: "https://www.linkedin.com",
      icon: <FaGithub className="h-[1.2rem] w-[1.2rem]"/>
    },    
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com",
      icon: <FaLinkedin className="h-[1.2rem] w-[1.2rem]"/>
    },
    {
      name: "Youtube",
      href: "https://www.linkedin.com",
      icon: <FaYoutube className="h-[1.2rem] w-[1.2rem]"/>
    },    
    {
      name: "X",
      href: "https://www.twitter.com",
      icon: <FaTwitter className="h-[1.2rem] w-[1.2rem]"/>
    },
  ]

  export const stats = [
    {
      num: 4,
      text: "Years of experience"
    },
    {
      num: 1,
      text: "Projects completed"
    },
    {
      num: 3,
      text: "Technologies"
    },
    {
      num: 500,
      text: "Code Commits"
    }
  ]