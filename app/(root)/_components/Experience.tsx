"use client";

import { Timeline } from '@/components/ui/timeline';
import { api } from '@/convex/_generated/api';
import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import ExperienceEntry from './ExperienceEntry';

const Experience = () => {
    const { data, isPending, error } = useQuery(convexQuery(api.occupations.getOccupations,{}));
    const arrTimeline = [];
    if(data === undefined){
        return;
    }

    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });
    const formattedDate = formatter.format(date);

    for (const element of data) {
        arrTimeline.push({
            title: new Date(element.occupation.startDate|| Date.now()).getFullYear() + " - " + new Date(element.occupation.endDate|| Date.now()).getFullYear(),
            content: <ExperienceEntry occupation={element.occupation} company={element.company} user={element.user} /> 
        } )    
    }   

  return (
    <section>
        <Timeline 
            title={"Work Experience"} 
            description={"I've been working in the tech industry for a while now. Here's a timeline of my journey."}
            data={arrTimeline} 
        />
    </section>
  )
}

export default Experience