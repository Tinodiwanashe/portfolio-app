
"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Link from "next/link";
import { FaArrowUpRightFromSquare, FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import TableOptions from "../_components/TableOptions";
import BlankSlate from "@/components/custom/BlankSlate";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Id } from "@/convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import React from 'react'
  
  export default function page() {
    const users = useQuery(convexQuery(api.users.getUsers,{}));

    if (users.data === undefined || users.data.length === 0) {
        return (
        <BlankSlate 
            icon={
                <h3 className="text-2xl font-bold tracking-tight">
                    You have no users
                </h3>
            }
            content={
                <p className="text-sm text-muted-foreground">
                    You can start managing as soon as you add a user.
                </p>
            } 
            actions={
                <Create destination={`/settings/user/create`} />
            }
        />
        )
    }

    return (
        <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
                <div className="grid gap-2">
                    <CardTitle>Users</CardTitle>
                    <CardDescription>
                    All users that have loggedin.
                    </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="#">
                    View All
                     <FaArrowUpRightFromSquare className="h-4 w-4" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>A list of users.</TableCaption>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead className="hidden md:table-cell">Created On</TableHead>
                        <TableHead className="text-right"><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {users.data.map((record) => (
                        <TableRow key={record.user._id}>
                            <TableCell className="font-medium">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src={record.user.pictureUrl || ""} alt="Avatar" />
                                    <AvatarFallback>{getInitials(record.user.name)}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="font-medium">{record.user.name}</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        {record.user.email}
                                    </div>
                                </div>

                            </TableCell>
                            <TableCell>{record.user.address}</TableCell>
                            <TableCell>{record.country?.name}</TableCell>
                            <TableCell className="hidden md:table-cell">{ new Date(record.user._creationTime).toLocaleDateString()}</TableCell> 
{/*                             formatDateToLocal(record.user._creationTime.toString()) */}
                            <TableCell className="text-right">
                                <TableOptions>
                                    <Edit destination={`/settings/users/${encodeURIComponent(record.user._id)}/edit`}/>
                                    <Delete id={record.user._id}/>
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

    )
  }

    const Create = ({destination}: {destination: string}) => {
    return (
    <Link
        href={destination}
        className={buttonVariants({ variant: "default" })}
    >
        Add User {' '}
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



    const Delete = ({id}: {id: Id<"User">}) => {

        const deleteUser = useMutation(api.users.deleteUser);
        return (
            <DropdownMenuItem onClick={() => deleteUser({id})}>
                <FaTrash className="mr-2 h-4 w-4" />
                <span>Delete</span>
            </DropdownMenuItem>
        );
    }

  


  