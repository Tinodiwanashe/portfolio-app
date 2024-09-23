import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
  
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]
  
  export default function page() {
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
  