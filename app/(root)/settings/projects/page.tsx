
"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Link from "next/link";
import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import BlankSlate from "@/components/custom/BlankSlate";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import TableOptions from "../_components/TableOptions";
import { Id } from "@/convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { useAlertDialog } from "@/hooks/use-alert-dialog";
import { TextObject } from "@/convex/helpers";
  
  export default function page() {
    const { data, isPending, error } = useQuery(convexQuery(api.projects.getProjects,{}));

    if (data === undefined || data.length === 0) {
        return (
        <BlankSlate 
            title={
                <h1 className="text-lg font-semibold md:text-2xl">Projects</h1>
            }
            icon={
                <h3 className="text-2xl font-bold tracking-tight">
                    You have no Projects
                </h3>
            }
            content={
                <p className="text-sm text-muted-foreground">
                    You can start managing as soon as you add a Projects.
                </p>
            } 
            actions={
                <Create destination={`/settings/projects/create`} />
            }
        />
        )
    }

    return (
        <>
            <div className="flex items-center mb-3">
                <div className="ml-auto flex items-center gap-2">
                    <Create destination={`/settings/projects/create`}/>
                </div>
            </div>        
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <div className="grid gap-2">
                        <CardTitle>Projects</CardTitle>
                        <CardDescription>
                        All projects that have been added.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>A list of Projects.</TableCaption>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Skills</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead className="hidden md:table-cell">Created On</TableHead>
                            <TableHead className="text-right"><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {data.map((record) => (
                            <TableRow key={record.project._id}>
                                <TableCell className="font-medium">{record.project.name}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2 flex-wrap">
                                        {record.project.skills?.map((text: TextObject, index: number) => (
                                            <Badge key={index} variant="secondary">{text.value}</Badge>
                                        ))}                                    
                                    </div>
                                </TableCell>
                                <TableCell>{record.company?.name}</TableCell>
                                <TableCell className="hidden md:table-cell">{ new Date(record.project._creationTime).toLocaleDateString()}</TableCell> 
    {/*                             formatDateToLocal(record.project._creationTime.toString()) */}
                                <TableCell className="text-right">
                                    <TableOptions>
                                        <Edit destination={`/settings/projects/${encodeURIComponent(record.project._id)}/edit`}/>
                                        <Delete id={record.project._id} />
                                    </TableOptions>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>        
        </>
    )
  }

  const Create = ({destination}: {destination: string}) => {
    return (
    <Link
        href={destination}
        className={buttonVariants({ variant: "default" })}
    >
        Add Project {' '}
        <FaPlus className="h-4 w-4" />
        
    </Link>
    )
  }

  const Edit = ({destination}: {destination: string}) => {

    return (
        <Link href={destination}>
            <DropdownMenuItem>
                <FaPencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
            </DropdownMenuItem>
        </Link>
    );
}

const Delete = ({id}: {id: Id<"Project">}) => {
    const alertDialog = useAlertDialog();
    const deleteProject = useMutation(api.projects.deleteProject);
    return (
        <DropdownMenuItem onClick={() => {
            alertDialog.onOpen({
                title: "Delete Confirmation",
                description: "Are you sure you want to delete this item?",
                cancelLabel: "Cancel",
                actionLabel: "Delete",
                onAction: () => { deleteProject({id}); },
                onCancel: () => { },
            });
        }}>
            <FaTrash className="mr-2 h-4 w-4" />
            <span>Delete</span>
        </DropdownMenuItem>
    );
}


  