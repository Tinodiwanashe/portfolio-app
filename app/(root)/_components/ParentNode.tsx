import { Circle } from '@/components/custom/Circle'
import React from 'react'

type ParentNodeProps = {
    children?: React.ReactNode;
    parentDivRef: React.RefObject<HTMLDivElement>;
}

const ParentNode = (props: ParentNodeProps) => {
  return (
  <Circle ref={props.parentDivRef} className="size-16">
    {props.children}
  </Circle> 
  )
}

export default ParentNode