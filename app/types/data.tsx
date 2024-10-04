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

  export const menuItems = [
    {
      label: "Home",
      href: "/",
      icon: <FaHome/>,
      isPrivateRoute: false,
      hasProductItem: true,
      SubMenuItems: [
/*         {
          label: "Tailwind Master Kit",
          description: "Prepare for tech interviews like never before.",  
          icon: <FaHome/>,
          href: "https://tailwindmasterkit.com",
          src: "https://assets.aceternity.com/demos/tailwindmasterkit.webp"
        },
        {
          label: "Rogue",
          description: "Respond to government RFPs, RFIs and RFQs 10x faster using AI",
          icon: <FaHome/>,
          href: "https://userogue.com",
          src: "https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
        } */
      ]
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <FaUserAstronaut/>,
      isPrivateRoute: true,
      hasProductItem: false,
      SubMenuItems: []
    },
    {
      label: "Experience",
      href: "/experience",
      icon: <FaUserAstronaut/>,
      isPrivateRoute: false,
      hasProductItem: false,
      SubMenuItems: []
    },
    {
      label: "Resume",
      href: "/resume",
      icon: <FaFilePdf/>,
      isPrivateRoute: false,
      hasProductItem: false,
      SubMenuItems: [
/*         {
          label: "About Us",
          description: "Learn more about us",
          icon: <FaUser/>, 
          isPrivateRoute: false,
          href: "/about",
          src: "https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png",
        }, {
          label: "About our team",
          description: "Learn more about us",  
          icon: <FaUser/>,
          isPrivateRoute: false,
          href: "/about",
          src: "https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
        } */
      ]
    },
    {
      label: "Contact me",
      href: "/contact",
      icon: <FaPhone/>,
      isPrivateRoute: false,
      hasProductItem: false,
      SubMenuItems: []
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