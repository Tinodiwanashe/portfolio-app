import { Circle } from '@/components/custom/Circle'
import { AnimatedBeam } from '@/components/ui/animated-beam'
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