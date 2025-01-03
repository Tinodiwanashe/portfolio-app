import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import FileUploadForm from './FileUploadForm'

const FileUploadPopup = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Documents</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload documents</DialogTitle>
          <DialogDescription>
            Upload documents to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
             <FileUploadForm/>
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default FileUploadPopup