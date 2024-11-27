"use client";

import { Timeline, TimelineEntry } from '@/components/ui/timeline';
import { api } from '@/convex/_generated/api';
import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import ExperienceEntry from './ExperienceEntry';
import Loading from '@/components/custom/loading';
import { Preloaded, usePreloadedQuery } from 'convex/react';

type PreloadedProps = {
    preloadedUser: Preloaded<typeof api.users.getUserByName>;
  }

const Experience = (props: PreloadedProps) => {
    const user = usePreloadedQuery(props.preloadedUser);
    const occupations = useQuery(convexQuery(api.occupations.getOccupationsByUserId,{userId: user._id}));
    if(occupations.data === undefined){
        return;
    }

    const dataArray: TimelineEntry[] = [];
    occupations.data.forEach((element) => {
        dataArray.push({
            title: new Date(element.occupation.startDate|| Date.now()).getFullYear() + " - " + new Date(element.occupation.endDate|| Date.now()).getFullYear(),
            content: <ExperienceEntry occupation={element.occupation} company={element.company}  /> 
        });    
    })

  return (
    <section id="experience" className="container">
        <Suspense fallback={<Loading/>}>
            <Timeline 
                title={"Work Experience"} 
                description={"I've been working in the tech industry for a while now. Here's a timeline of my journey."}
                data={dataArray} 
            />
        </Suspense>
    </section>
  )
}

export default Experience