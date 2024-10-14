import IconCloud from '@/components/ui/icon-cloud';
import React from 'react'

const slugs = [
    "typescript",
    "javascript",
    "react",
    "microsoftazure",
    "dotnet",
    "html5",
    "css3",
    "csharp",
    "postgresql",
    "visualstudio",
    "shadcnui",
    "supabase",
    "vercel",
    "nextdotjs",
    "convexdev",
    "tailwindcss",
    "git",
    "trello",
    "github",
    "visualstudiocode",
    "microsoftsqlserver",
  ];

const Skills = () => {
  return (
    <section className=" container my-auto size-full">
        <div className="relative flex size-full max-w-full items-center justify-center overflow-hidden rounded-lg bg-background px-20 pb-20 pt-8 ">
            <IconCloud iconSlugs={slugs} />
        </div>        
    </section>
  )
}

export default Skills