import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useMutation } from 'convex/react';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaEllipsisVertical, FaPencil } from 'react-icons/fa6';

export default async function TableOptions({id}: {id: Id<"User"> }) {
  return (
    <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    aria-haspopup="true"
                    size="icon"
                    variant="ghost"
                >
                    <FaEllipsisVertical className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <EditUser id={id}/>
            <DeleteUser id={id}/>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  );
};

const EditUser = ({ id }: { id: Id<"User"> }) => {
    function redirectToUserForm(){
        const path =  `/dashboard/users/${id}/edit`;
        revalidatePath(path);
        redirect(path);
    }
    return (
      <DropdownMenuItem
        onClick={() => redirectToUserForm()}
      >
        <FaPencil className="mr-2 h-4 w-4" />
        <span>Edit</span>
      </DropdownMenuItem>
    );
  }

  
  
 const DeleteUser = ({ id }: { id: Id<"User"> }) => {
    
    const deleteUser = useMutation(api.users.deleteUser);
    return (
        <DropdownMenuItem onClick={() => {}}>
            <FaTrash className="mr-2 h-4 w-4" />
            <span>Delete</span>
        </DropdownMenuItem>
    );
  }