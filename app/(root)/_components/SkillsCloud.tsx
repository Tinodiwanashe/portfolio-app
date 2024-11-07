import IconCloud from '@/components/ui/icon-cloud';
import { api } from '@/convex/_generated/api';
import { convexQuery } from '@convex-dev/react-query';
import { useQuery } from '@tanstack/react-query';
import React, { Suspense } from 'react'

export const SkillsCloud = () => {
  const skillCodes = useQuery(convexQuery(api.skills.getSkillCodes,{}));
  return (
    <Suspense fallback={<p>Loading skills...</p>}>
        {!skillCodes.isPending && 
        <div className="size-full flex items-center justify-center relative overflow-hidden rounded-lg bg-background ">
            <IconCloud iconSlugs={skillCodes.data ?? []} />
        </div>
        }
  </Suspense> 
  )
}
