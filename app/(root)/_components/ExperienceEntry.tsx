
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TextObject, WorkExperienceItem } from '@/convex/helpers';
import React from 'react'

const ExperienceEntry = (experience: WorkExperienceItem) => {
  return (
    <>
      <p className="font-semibold bg-clip-text bg-gradient-to-r from-primary to-secondary text-lg md:text-lg lg:text-lg text-purple mb-8">
        {experience.company.name}
      </p>
      <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-semibold mb-8">
        {experience.occupation?.title}
      </p>
      <Accordion type="multiple" className="w-full">
        {experience.occupation.responsibilities &&
          (
            <AccordionItem value="item-1">
              <AccordionTrigger>Responsibilities</AccordionTrigger>
              <AccordionContent>
                {
                  experience.occupation.responsibilities.map((item: TextObject,index: number) => (
                    <div key={index} className="flex gap-2 items-center text-xs md:text-sm">
                      ☑️ {item.value}
                    </div>
                  ))
                }
              </AccordionContent>
            </AccordionItem>
          )
        }
        {experience.occupation.achievements && 
          (
          <AccordionItem value="item-2">
            <AccordionTrigger>Achievements</AccordionTrigger>
            <AccordionContent>
              {
                experience.occupation.achievements.map((item: TextObject, index: number) => (
                  <div key={index} className="flex gap-2 items-center text-xs md:text-sm">
                    🏆 {item.value}
                  </div>
                ))
              }
            </AccordionContent>
          </AccordionItem>
          )
        }
      </Accordion>
    </>
  )
}

export default ExperienceEntry