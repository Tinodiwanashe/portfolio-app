"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React from 'react'
import { useDialog } from '@/hooks/use-dialog';

const InfoDialog = () => {
  const infoDialog = useDialog();

/*   const handleCloseDialog = (event) => {
    event.preventDefault();
    setOpen(false);
  } */
  return (
    <Dialog onOpenChange={infoDialog.onClose} open={infoDialog.isOpen} modal defaultOpen={infoDialog.isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{infoDialog.title}</DialogTitle>
          <DialogDescription>
          {infoDialog.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {infoDialog.children}
        </div>
      </DialogContent>      
    </Dialog> 
  )
}

export default InfoDialog