"use client"

import { Row } from "@tanstack/react-table"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDialog } from "@/hooks/use-dialog";
import { useAlertDialog } from "@/hooks/use-alert-dialog";
import TableOptions from "../../_components/TableOptions"
import { FaLink, FaPencil, FaTrash } from "react-icons/fa6"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import Link from "next/link"
import NewSkillLinkForm from "./NewSkillLinkForm"
import { SkillSchema } from "@/app/types/definitions";
import React from 'react';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
    
  //const record = SkillSchema.parse(row.original);
  const record = SkillSchema.parse(row.original);
  
  return (
    <TableOptions>
        <Edit destination={`/settings/skills/${encodeURIComponent(record._id as Id<"Skill">)}/edit`}/>
        <Delete id={record._id as Id<"Skill">} />
        <LinkSkill id={record._id as Id<"Skill">} />
  </TableOptions> 
  )
}

const Edit = ({destination}: {destination: string}) => {
    return (
        <Link href={destination}>
            <DropdownMenuItem >
                <FaPencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
            </DropdownMenuItem>        
        </Link>
    );
  }
  
  const Delete = ({id}: {id: Id<"Skill">}) => {
    const alertDialog = useAlertDialog();
    const deleteskill = useMutation(api.skills.deleteSkill);
    return (
        <DropdownMenuItem onClick={() => {
            alertDialog.onOpen({
                title: "Delete Confirmation",
                description: "Are you sure you want to delete this item?",
                cancelLabel: "Cancel",
                actionLabel: "Delete",
                onAction: () => deleteskill({id}),
                onCancel: () => { },
            });
        }}>
            <FaTrash className="mr-2 h-4 w-4" />
            <span>Delete</span>
        </DropdownMenuItem>
    );
  }
  
  const LinkSkill = ({id}: {id: Id<"Skill">}) => {
    const infoDialog = useDialog();
    return (
        <DropdownMenuItem onClick={() => {
            infoDialog.onOpen({
              title: "Link a Skill",
              description: "Are you sure you want to delete this item?",
              children: <NewSkillLinkForm parentId={id}/>
            });
        }}
        >
            <FaLink className="mr-2 h-4 w-4" />
            <span>Link</span>
        </DropdownMenuItem>
    );
  }