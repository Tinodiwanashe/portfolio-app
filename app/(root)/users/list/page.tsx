
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
  
  export default async function page() {
    const users = useQuery(api.users.getUsers);

    if (users === undefined) {
      return <div>Loading...</div>
    }
    return (
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden xl:table-column">Name</TableHead>
            <TableHead className="hidden xl:table-column">Email</TableHead>
            <TableHead className="hidden xl:table-column">Address</TableHead>
            <TableHead className="hidden xl:table-column">Token Identifier</TableHead>
            <TableHead className="text-right">Country</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="hidden xl:table-column">{user.email}</TableCell>
              <TableCell className="hidden xl:table-column">{user.address}</TableCell>
              <TableCell className="hidden xl:table-column">{user.tokenIdentifier}</TableCell>
              <TableCell className="text-right">{user.countryId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  