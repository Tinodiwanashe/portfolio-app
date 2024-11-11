import { Circle } from '@/components/custom/Circle'
import CustomToolTip from '@/components/custom/CustomToolTip'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { getInitials } from '@/lib/utils'
import React, { useRef } from 'react'

type ChildNodeProps = {
    children?: React.ReactNode;
    parentDivRef: React.RefObject<HTMLDivElement>;
    containerDivRef: React.RefObject<HTMLDivElement>;
}

const ChildNode = (props: ChildNodeProps) => {
    const divChildRef = useRef<HTMLDivElement>(null);
  return ( 
      <>
        <Circle ref={divChildRef}>
          {props.children}
        </Circle>
        <AnimatedBeam
          containerRef={props.containerDivRef}
          fromRef={divChildRef}
          toRef={props.parentDivRef}
        />      
      </>
  )
}

export default ChildNode