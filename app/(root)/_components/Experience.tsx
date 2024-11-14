"use client";

import { Timeline, TimelineEntry } from '@/components/ui/timeline';
import { api } from '@/convex/_generated/api';
import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import ExperienceEntry from './ExperienceEntry';

const Experience = () => {
    const { data, isPending, error } = useQuery(convexQuery(api.occupations.getOccupations,{}));
    if(data === undefined){
        return;
    }

    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });
    const formattedDate = formatter.format(date);

    const arrTimeline: TimelineEntry[] = [];
    data.forEach((element) => {
        arrTimeline.push({
            title: new Date(element.occupation.startDate|| Date.now()).getFullYear() + " - " + new Date(element.occupation.endDate|| Date.now()).getFullYear(),
            content: <ExperienceEntry occupation={element.occupation} company={element.company}  /> 
        } )    
    })

  return (
    <section id="experience" className="container">
        <Suspense fallback={<p>Loading experience...</p>}>
            <Timeline 
                title={"Work Experience"} 
                description={"I've been working in the tech industry for a while now. Here's a timeline of my journey."}
                data={arrTimeline} 
            />
        </Suspense>
    </section>
  )
}

export default Experience