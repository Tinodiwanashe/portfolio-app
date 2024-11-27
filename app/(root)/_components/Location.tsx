"use client";

import Globe from '@/components/magicui/globe'
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';
import { COBEOptions } from 'cobe';
import React from 'react'

type LocationProps = {
  id: Id<"User">;
}



export const Location = (props: LocationProps) => {
  const user = useQuery(convexQuery(api.users.getUser, {id: props.id}));
  const options: COBEOptions = {
    width: 800,
    height: 800,
    onRender: () => {},
    devicePixelRatio: 2,
    phi: 0,
    theta: -0.15,
    dark: 1,
    diffuse: 0.4,
    mapSamples: 100000,
    mapBrightness: 1.2,
    baseColor: [203 / 255, 172 / 255, 249 / 255], //RGB colors
    markerColor: [251 / 255, 100 / 255, 21 / 255],
    glowColor: [1, 1, 1],
    markers: [
      { location: [user.data?.latitude ?? 0, user.data?.longitude?? 0], size: 0.5 }
    ],
  };

  return user && (
    <div className='size-full flex flex-col items-center justify-center relative overflow-hidden'>
      <Globe  config={options}/>
    </div>
    
  )
}