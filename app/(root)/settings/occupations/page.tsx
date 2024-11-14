"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Link from "next/link";
import { FaCirclePlus, FaPencil, FaTrash } from "react-icons/fa6";
import BlankSlate from "@/components/custom/BlankSlate";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import TableOptions from "../_components/TableOptions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { useAlertDialog } from "@/hooks/use-alert-dialog";
  
  export default function page() {
    const { data, isPending, error } = useQuery(convexQuery(api.occupations.getOccupations,{}));

    if (data === undefined || data.length === 0) {
        return (
        <BlankSlate 
            title={
                <h1 className="text-lg font-semibold md:text-2xl">Occupations</h1>
            }
            icon={
                <h3 className="text-2xl font-bold tracking-tight">
                    You have no Occupations
                </h3>
            }
            content={
                <p className="text-sm text-muted-foreground">
                    You can start managing as soon as you add an Occupation.
                </p>
            } 
            actions={
                <Create destination={`/settings/occupations/create`} name={"Occupation"}/>
            }
        />
        )
    }

    return (
        <>
            <div className="flex items-center mb-3">
                <div className="ml-auto flex items-center gap-2">
                    <Create destination={`/settings/occupations/create`} name={"Occupation"}/>
                </div>
            </div>
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <div className="grid gap-2">
                        <CardTitle>Occupations</CardTitle>
                        <CardDescription>
                        All occupations that have been added.
                        </CardDescription>
                    </div>
                    
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>A list of occupations.</TableCaption>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Started On</TableHead>
                            <TableHead>Ended On</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead className="hidden md:table-cell">Created On</TableHead>
                            <TableHead className="text-right"><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {data.map((record) => (
                            <TableRow key={record.occupation._id}>
                                <TableCell className="font-medium">{record.occupation.title}</TableCell>
                                <TableCell>{ new Date(record.occupation.startDate || Date.now()).toLocaleDateString()}</TableCell>
                                <TableCell>{ new Date(record.occupation.endDate || Date.now()).toLocaleDateString()}</TableCell>
                                <TableCell>{record.company?.name}</TableCell>
                                <TableCell>{record.user?.userName}</TableCell>
                                <TableCell className="hidden md:table-cell">{ new Date(record.occupation._creationTime).toLocaleDateString()}</TableCell> 
    {/*                             formatDateToLocal(record.project._creationTime.toString()) */}
                                <TableCell className="text-right">
                                    <TableOptions>
                                            <Edit destination={`/settings/occupations/${encodeURIComponent(record.occupation._id)}/edit`}/>
                                            <Delete id={record.occupation._id} />
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

  const Create = ({ destination, name }: { destination: string; name: string }) => {
    return (
        <Link // className="h-7 gap-1"
            href={destination}
            className={cn(buttonVariants({ variant: "default" })," h-7 gap-1")}
        >
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add {name}</span>
            <FaCirclePlus className="h-4 w-4" />
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

const Delete = ({id}: {id: Id<"Occupation">}) => {
    const alertDialog = useAlertDialog();
    const deleteOccupation = useMutation(api.occupations.deleteOccupation);
    return (
        <DropdownMenuItem onClick={() => {
            alertDialog.onOpen({
                title: "Delete Confirmation",
                description: "Are you sure you want to delete this item?",
                cancelLabel: "Cancel",
                actionLabel: "Delete",
                onAction: () => { deleteOccupation({id}); },
                onCancel: () => { },
            });
        }}>
            <FaTrash className="mr-2 h-4 w-4" />
            <span>Delete</span>
        </DropdownMenuItem>
    );
}


  