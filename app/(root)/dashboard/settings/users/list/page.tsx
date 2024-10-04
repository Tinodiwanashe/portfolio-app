
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import { FaArrowUpRightFromSquare, FaPencil, FaTrash, FaEllipsisVertical } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateToLocal, getInitials } from "@/lib/utils";
import TableOptions from "../_components/TableOptions";
  
  export default function usersTable() {
    const usersList = useQuery(api.users.getUsers);

    if (usersList === undefined) {
      return <div>Loading...</div>
    }
    return (
        <Card>
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
                    {usersList.map((record) => (
                        <TableRow key={record.user._id}>
                            <TableCell className="font-medium">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src={record.user.pictureUrl} alt="Avatar" />
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
                            <TableCell className="hidden md:table-cell">{ new Date(record.user._creationTime).toLocaleTimeString()}</TableCell> 
{/*                             formatDateToLocal(record.user._creationTime.toString()) */}
                            <TableCell className="text-right">
                                <TableOptions id={record.user._id}/>
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


  