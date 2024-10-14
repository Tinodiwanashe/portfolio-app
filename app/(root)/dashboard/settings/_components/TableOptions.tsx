"use client";

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useMutation } from 'convex/react';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { FaEllipsisVertical, FaPencil, FaTrash } from 'react-icons/fa6';
import router from 'next/router';
import { RootLayoutProps } from '@/app/types/definitions';

export default function TableOptions({children} : RootLayoutProps) {
  //encodeURIComponent
  return (
    <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    aria-haspopup="true"
                    size="icon"
                    variant="ghost"
                >
                    <FaEllipsisVertical className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
              <>
                {children}
              </>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  );
};