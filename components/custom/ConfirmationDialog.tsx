"use client";

import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { useAlertDialog } from '@/hooks/use-alert-dialog';

const ConfirmationDialog = () => {
  const alertDialog = useAlertDialog();

  return (
    <AlertDialog onOpenChange={alertDialog.onClose} open={alertDialog.isOpen} defaultOpen={alertDialog.isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertDialog.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {alertDialog.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={alertDialog.onCancel}>{alertDialog.cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={alertDialog.onAction}>{alertDialog.actionLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>     
    </AlertDialog> 
  )
}

export default ConfirmationDialog