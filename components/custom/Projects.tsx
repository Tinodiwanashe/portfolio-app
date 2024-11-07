"use client";

import React, { Suspense } from 'react';
import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { api } from '@/convex/_generated/api';
import { Badge } from '../ui/badge';
import BlurFade from '../ui/blur-fade';
import Meteors from '../ui/meteors';
import { BorderBeam } from '../ui/border-beam';
import { BLUR_FADE_DELAY } from '@/app/types/constants';
import { SkeletonCard } from './SkeletonCard';
import { textEllipsis } from '@/lib/utils';
import { FaGithub, FaGlobe } from 'react-icons/fa6';



const Projects = () => {
    const { data, isPending, error } = useQuery(convexQuery(api.projects.getProjects,{}));
  return (
    <section id="projects" className="container h-max bg-white dark:bg-black-100 ">
        
            <div className="py-12">
                <BlurFade delay={BLUR_FADE_DELAY * 11}>
                    <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
                        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
                            My Projects
                        </h2>
                        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
                            I&apos;ve worked on a variety of projects, from simple
                            websites to complex web applications. Here are a few of my
                            favorites.
                        </p>
                    </div>
                </BlurFade>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3  mx-auto">
                    {data && data.map((record, index) => (
                        <Suspense fallback={<SkeletonCard/>}>
                            <BlurFade
                                key={record.project.name}
                                delay={BLUR_FADE_DELAY * 12 + index * 0.05}
                            >
                                <Card className="relative overflow-hidden  flex flex-col ">
                                    <Meteors number={20}/>
                                    <CardHeader>
                                        <CardTitle>{record.project.name}</CardTitle>
                                        <CardDescription >{textEllipsis(record.project.description?? "", 200)}</CardDescription>
                                    </CardHeader>
                                    <CardContent className='flex-1'>
    
                                    </CardContent>
                                    <CardFooter>
                                        <div className='flex flex-col gap-2'>
                                            <div className='flex flex-row flex-wrap gap-2'>
                                                {record.project.skills && record.project.skills.map((record,index) => ( 
                                                    <Badge key={index} variant="secondary">{record.value}</Badge>
                                                ))}
                                            </div>
                                            <div className='flex flex-row flex-wrap gap-2'>
                                                <Badge variant="default">
                                                    <div className='flex flex-row items-center gap-2 flex-wrap'>
                                                        <FaGlobe/> 
                                                        <span>
                                                            Website
                                                        </span>
                                                    </div>
                                                </Badge>
                                                <Badge variant="outline">
                                                    <div className='flex flex-row items-center gap-2 flex-wrap'>
                                                        <FaGithub/> 
                                                        <span>
                                                            Source Code
                                                        </span>
                                                    </div>
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </BlurFade>
                        </Suspense>
                    ))}
                </div>
                {/* <BorderBeam size={250} duration={12} delay={9} /> */}
            </div>        
    </section>
  )
}

export default Projects