
"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useMutation, usePaginatedQuery } from "convex/react";
import Link from "next/link";
import { FaLink, FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import BlankSlate from "@/components/custom/BlankSlate";
import { Id } from "@/convex/_generated/dataModel";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDialog } from "@/hooks/use-dialog";
import NewSkillLinkForm from "./_components/NewSkillLinkForm";
import { useAlertDialog } from "@/hooks/use-alert-dialog";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
  
  export default function page() {
    const skills = useQuery(convexQuery(api.skills.getSkills,{}));
    if (skills.data === undefined) {
        return (
        <BlankSlate 
            title={
                <h1 className="text-lg font-semibold md:text-2xl">Skills</h1>
            }
            icon={
                <h3 className="text-2xl font-bold tracking-tight">
                    You have no Skills
                </h3>
            }
            content={
                <p className="text-sm text-muted-foreground">
                    You can start managing as soon as you add a Skill.
                </p>
            } 
            actions={
                <Create destination={`/settings/skills/create`} name={"Skill"}/>
            }
        />
        )
    }

    return (
        <>
            <div className="flex items-center mb-3">
                <div className="ml-auto flex items-center gap-2">
                <Create destination={`/settings/skills/create`} name={"Skill"}/>
                </div>
            </div>
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <div className="grid gap-2">
                        <CardTitle>Skills</CardTitle>
                        <CardDescription>
                        All skills that have been added.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={skills.data} />
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>        
        </>
    )
  }

  const Create = ({ destination, name }: { destination: string; name: string }) => {
    return (
    <Link
        href={destination}
        className={buttonVariants({ variant: "default" })}
    >
        Add {name} {' '}
        <FaPlus className="h-4 w-4" />
        
    </Link>
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


  