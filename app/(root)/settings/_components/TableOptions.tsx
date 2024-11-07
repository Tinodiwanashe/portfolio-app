"use client";

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import React from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';
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