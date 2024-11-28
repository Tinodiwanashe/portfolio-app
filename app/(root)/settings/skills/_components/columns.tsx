"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";
import { UserSkill } from "@/convex/helpers";
import React from 'react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// Columns are where you define the core of what your table will look like. They define the data that will be displayed, how it will be formatted, sorted and filtered.

export const columns: ColumnDef<UserSkill>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      <DataTableColumnHeader column={column} title="Name" /> 
    }, // header cell sorting controls.    
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "linkedSkills",
    header: "Linked Skills",
    cell: ({ row }) => {
      const linkedSkills = row.getValue("linkedSkills") as [];
      
      console.log(`Linked Skills: ${linkedSkills}`);
      const arrLinkedSkills = linkedSkills.join(",").split(",");
      return (
        <div className="flex flex-row gap-2 flex-wrap">
          {
            (arrLinkedSkills ?? []).map((skill) => {
              return <Badge key={skill} variant="secondary">{skill}</Badge> // Render each child skill as a separate row.  // You could also use a nested table or something like that here.  // This is just a simple example. You can customize this as needed.  // This is how you would add a new column to your table.  // You would also need to add this column to your column definitions array.  // This is how you would add a new column to your table.  // You would also need to add this column to your column definitions array.  // This is how you would add a new column to your table.  // You would also need to add this column to your column definitions array.  // This is how you would add a new column to your table.  // You would also need to add this column to your column definitions array.  // This is how you would add a new column to your table.  // You would
            })
          }        
        </div>
      )
    }
  },
  {
    accessorKey: "_creationTime",
    header: "Created On",
    cell: ({ row }) => {
      const creationDAte = parseFloat(row.getValue("_creationTime"));
      const formatted = new Date(creationDAte).toLocaleDateString();
 
      return <div >{formatted}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DataTableRowActions row={row} />
      )
    }
  }  
]


