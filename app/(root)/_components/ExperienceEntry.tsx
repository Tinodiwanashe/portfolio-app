import { Doc } from '@/convex/_generated/dataModel';
import React from 'react'

export type WorkExperience = {
    occupation: Doc<"Occupation"> | null;
    company: Doc<"Company"> | null;
    user: Doc<"User"> | null;
  };

const ExperienceEntry = (props: WorkExperience) => {
  return (
    <>
        <p className="font-semibold bg-clip-text bg-gradient-to-r from-primary to-secondary text-lg md:text-lg lg:text-lg text-emerald-500 mb-8">
            {props.company?.name}
        </p>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-semibold mb-8">
            {props.occupation?.title}
        </p>
        
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Responsibilities
        </p>
        <div className="mb-8" >
          {props.occupation?.responsibilities && props.occupation?.responsibilities.map((record) => (
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ {record.value}
            </div>
          ))}
        </div>
    </>
  )
}

export default ExperienceEntry