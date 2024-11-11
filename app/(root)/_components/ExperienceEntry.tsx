
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { WorkExperienceItem } from '@/convex/helpers';
import React from 'react'



const ExperienceEntry = (props: WorkExperienceItem) => {
  return (
    <>
        <p className="font-semibold bg-clip-text bg-gradient-to-r from-primary to-secondary text-lg md:text-lg lg:text-lg text-purple mb-8">
            {props.company?.name}
        </p>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-semibold mb-8">
            {props.occupation?.title}
        </p>
        <Accordion type="multiple" className="w-full">
        {props.occupation.responsibilities &&
          (
            <AccordionItem value="item-1">
              <AccordionTrigger>Responsibilities</AccordionTrigger>
              <AccordionContent>
                {props.occupation.responsibilities.map((record,index) => (
                  <div key={index} className="flex gap-2 items-center text-xs md:text-sm">
                    ☑️ {record.value}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )
        }
        {props.occupation.achievements && 
          (
          <AccordionItem value="item-2">
            <AccordionTrigger>Achievements</AccordionTrigger>
            <AccordionContent>
              {props.occupation.achievements.map((record,index) => (
                <div key={index} className="flex gap-2 items-center text-xs md:text-sm">
                  🏆  {record.value}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          )
        }
        </Accordion>

    </>
  )
}

export default ExperienceEntry