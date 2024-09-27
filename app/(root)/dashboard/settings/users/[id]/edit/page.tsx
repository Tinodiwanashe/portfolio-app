import React from 'react'
import { Id } from "@/convex/_generated/dataModel"
import { ProfileForm } from '../../../_components/ProfileForm';

const page = ({ params }: { params: { id: Id<"User"> } }) => {
    const id = params.id;
  return (
    <>
        <ProfileForm/>
    </>
  )
}

export default page