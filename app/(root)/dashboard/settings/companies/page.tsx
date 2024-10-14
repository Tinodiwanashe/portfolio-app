
"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import Link from "next/link";
import { FaPencil, FaPlus, FaTrash } from "react-icons/fa6";
import BlankSlate from "@/components/tutorial/BlankSlate";
import { Id } from "@/convex/_generated/dataModel";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import TableOptions from "../_components/TableOptions";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
  
  export default function page() {
    const { data, isPending, error } = useQuery(convexQuery(api.companies.getCompanies,{}));

    if (data === undefined || data.length === 0) {
        return (
        <BlankSlate 
            title={
                <h1 className="text-lg font-semibold md:text-2xl">Companies</h1>
            }
            icon={
                <h3 className="text-2xl font-bold tracking-tight">
                    You have no Companies
                </h3>
            }
            content={
                <p className="text-sm text-muted-foreground">
                    You can start managing as soon as you add a Company.
                </p>
            } 
            actions={
                <Create destination={"dashboard/settings/companies/create"} name={"Company"}/>
            }
        />
        )
    }

    return (
        <>
            <div className="flex items-center mb-3">
                <div className="ml-auto flex items-center gap-2">
                <Create destination={"dashboard/settings/companies/create"} name={"Company"}/>
                </div>
            </div>
            <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                    <div className="grid gap-2">
                        <CardTitle>Companies</CardTitle>
                        <CardDescription>
                        All companies that have been added.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>A list of companies.</TableCaption>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead className="hidden md:table-cell">Created On</TableHead>
                            <TableHead className="text-right"><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {data.map((record) => (
                            <TableRow key={record.company._id}>
                                <TableCell className="font-medium"><Link href={record.company.url || "#"}>{record.company.name}</Link></TableCell>
                                <TableCell>{record.company.description}</TableCell>
                                <TableCell>{record.user?.name}</TableCell>
                                <TableCell className="hidden md:table-cell">{ new Date(record.company._creationTime).toLocaleDateString()}</TableCell> 
    {/*                             formatDateToLocal(record.project._creationTime.toString()) */}
                                <TableCell className="text-right">
                                    <TableOptions>
                                        <Edit destination={`/dashboard/settings/companies/${encodeURIComponent(record.company._id)}/edit`}/>
                                        <Delete id={record.company._id} />
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
    <Link
        href={`/${destination}`}
        className={buttonVariants({ variant: "default" })}
    >
        Add {name} {' '}
        <FaPlus className="h-4 w-4" />
        
    </Link>
    )
  }

  const Edit = ({destination}: {destination: string}) => {
    function redirectToForm(){
    /*         revalidatePath(path);
        redirect(path);  */
    }
    return (
        <Link href={destination}>
            <DropdownMenuItem 
                //onClick={() => redirectToForm()} 
            >
                <FaPencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
            </DropdownMenuItem>        
        </Link>
    );
}

const Delete = ({id}: {id: Id<"Company">}) => {

    const deleteCompany = useMutation(api.companies.deleteCompany);
    return (
        <DropdownMenuItem onClick={() => deleteCompany({id})}>
            <FaTrash className="mr-2 h-4 w-4" />
            <span>Delete</span>
        </DropdownMenuItem>
    );
}


  