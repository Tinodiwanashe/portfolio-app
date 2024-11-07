import { Circle } from '@/components/custom/Circle'
import { AnimatedBeam } from '@/components/ui/animated-beam'
import React, { useRef } from 'react'

type CircleProps = {
    children?: React.ReactNode;
    parentDivRef: React.RefObject<HTMLDivElement>;
}

const ParentNode = (props: CircleProps) => {
  return (
  <Circle ref={props.parentDivRef} className="size-16">
    {props.children}
  </Circle> 
  )
}

export default ParentNode