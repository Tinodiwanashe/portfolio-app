
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { WorkExperienceItem } from '@/convex/helpers';
import React from 'react'

const ExperienceEntry = ({occupation, company}: WorkExperienceItem) => {
  return (
    <>
        <p className="font-semibold bg-clip-text bg-gradient-to-r from-primary to-secondary text-lg md:text-lg lg:text-lg text-purple mb-8">
            {company?.name}
        </p>
        <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-semibold mb-8">
            {occupation?.title}
        </p>
        <Accordion type="multiple" className="w-full">
        {occupation.responsibilities &&
          (
            <AccordionItem value="item-1">
              <AccordionTrigger>Responsibilities</AccordionTrigger>
              <AccordionContent>
                {occupation.responsibilities.map((item,index) => (
                  <div key={index} className="flex gap-2 items-center text-xs md:text-sm">
                    ☑️ {item.value}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )
        }
        {occupation.achievements && 
          (
          <AccordionItem value="item-2">
            <AccordionTrigger>Achievements</AccordionTrigger>
            <AccordionContent>
              {occupation.achievements.map((item,index) => (
                <div key={index} className="flex gap-2 items-center text-xs md:text-sm">
                  🏆  {item.value}
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