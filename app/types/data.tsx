import { FaHammer, FaLinkedinIn, FaXTwitter, FaHouse, FaRegCircleUser, FaGithub , FaYoutube, FaPhone, FaUser, FaFilePdf, FaFilePowerpoint, FaUserTie } from 'react-icons/fa6';

  export const menuItems = [
    {
      label: "Home",
      href: "/",
      icon: <FaHouse/>,
      isPrivateRoute: false,
      hasProductItem: true,
      SubMenuItems: [
/*         {
          label: "Tailwind Master Kit",
          description: "Prepare for tech interviews like never before.",  
          icon: <FaHouse/>,
          href: "https://tailwindmasterkit.com",
          src: "https://assets.aceternity.com/demos/tailwindmasterkit.webp"
        },
        {
          label: "Rogue",
          description: "Respond to government RFPs, RFIs and RFQs 10x faster using AI",
          icon: <FaHouse/>,
          href: "https://userogue.com",
          src: "https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
        } */
      ]
    },
    {
      label: "Experience",
      href: "#experience",
      icon: <FaUserTie/>,
      isPrivateRoute: false,
      hasProductItem: false,
      SubMenuItems: []
    },
    {
      label: "Skills",
      href: "#skills",
      icon: <FaHammer/>,
      isPrivateRoute: false,
      hasProductItem: false,
      SubMenuItems: []
    },
    {
      label: "Projects",
      href: "#projects",
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

  export const sidebarNavItems = [
    {
      title: "Profile",
      href: "/settings/profile",
    },
    {
      title: "Projects",
      href: "/settings/projects",
    },
    {
      title: "Users",
      href: "/settings/users",
    },
    {
      title: "Companies",
      href: "/settings/companies",
    },
    {
      title: "Occupations",
      href: "/settings/occupations",
    },
    {
      title: "Skills",
      href: "/settings/skills",
    },    
  ]

  export const socials = [
    {
      name: "Github",
      href: "https://www.linkedin.com",
      icon: <FaGithub className="h-[1.2rem] w-[1.2rem]"/>
    },    
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com",
      icon: <FaLinkedinIn className="h-[1.2rem] w-[1.2rem]"/>
    },
    {
      name: "Youtube",
      href: "https://www.linkedin.com",
      icon: <FaYoutube className="h-[1.2rem] w-[1.2rem]"/>
    },    
    {
      name: "X",
      href: "https://www.twitter.com",
      icon: <FaXTwitter className="h-[1.2rem] w-[1.2rem]"/>
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

  export const contactMethods = [
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        ,
        contact: "kandoromt1@outlook.com"
    },
    {
        icon:
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
        ,
        contact: "+27 84 870 6127"
    }
]