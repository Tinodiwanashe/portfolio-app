import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getInitials } from '@/lib/utils'

type UserProps = {
    name: string;
    email?: string;
    pictureUrl?: string;
}

const UserAvatar = (props: UserProps) => {
  return (
    <div className="flex flex-row gap-3 items-center">
        <Avatar>
        <AvatarImage src={props.pictureUrl} alt="Avatar" />
        <AvatarFallback>{getInitials(props.name)}</AvatarFallback>
        </Avatar>  
        <div className="grid gap-1">
        <div className="font-medium">{props.name}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
            {props.email}
        </div>
        </div> 
    </div>   
  )
}

export default UserAvatar