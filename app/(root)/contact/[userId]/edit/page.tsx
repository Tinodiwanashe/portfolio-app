import React from 'react'
import { ProfileForm } from './_components/create-form';
import { Id } from "@/convex/_generated/dataModel"

const page = ({ params }: { params: { userId: Id<"User"> } }) => {
    const id = params.userId;
  return (
    <>
        <ProfileForm userId={id} />
    </>
  )
}

export default page