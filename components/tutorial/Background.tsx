import React from 'react'
import { Spotlight } from '../ui/spotlight'
import { GridBackground } from '../ui/GridBackground'
import GridPattern from '../ui/grid-pattern'
import { cn } from '@/lib/utils'

const Background = () => {
  return (
    <>
      <div>
        <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white" />
        <Spotlight className="h-[80vh] w-[50vw] top-10 left-full" fill="purple" />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="purple" />
      </div>
{/*       <GridBackground/> */}
      <GridPattern
        width={100}
        height={100}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,purple,transparent,transparent)] ", 
          //linear-gradient(to_bottom_right,white,transparent,transparent)]
          //radial-gradient(300px_circle_at_center,white,transparent)
        )}
      />
    </>
  )
}

export default Background