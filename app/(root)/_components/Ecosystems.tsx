"use client"

import { api } from '@/convex/_generated/api';
import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react'
import ChildNode from './ChildNode';
import ParentNode from './ParentNode';
import StringToHtml from '@/components/custom/StringToHtml';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Id } from '@/convex/_generated/dataModel';
import { Skill } from '@/convex/helpers';

type EcosystemsProps = {
  id: Id<"User">;
  parentSkill: string;
}

const Ecosystems = (props: EcosystemsProps) => {
    const skill = useQuery(convexQuery(api.skills.getSkillByName,{name: props.parentSkill, userId: props.id}));
    const childSkills = useQuery(convexQuery(api.skillLinks.getChildSkillsByName,{name: props.parentSkill, userId: props.id}));
    const containerRef = useRef<HTMLDivElement>(null);
    const divParentRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className="relative flex w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl"
      ref={containerRef}
    >
        <div className="flex size-full flex-row items-stretch justify-between gap-10 max-w-lg">
            <div  className="flex flex-col justify-center gap-2"> 
                {
                    childSkills.data?.map((item:Skill, index: number) => {
                        return (
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <ChildNode parentDivRef={divParentRef} containerDivRef={containerRef} >
                                    <StringToHtml key={index} content={item?.icon}/>                              
                                </ChildNode>   
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{item?.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                     
                        )
                    })
                }
            </div>
            <div className="flex flex-col justify-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <ParentNode parentDivRef={divParentRef}>
                                <StringToHtml content={skill.data?.icon}/>
                            </ParentNode>  
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>{skill.data?.name}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>                
            </div>           
        </div> 


    </div>
  ) 
}

export default Ecosystems