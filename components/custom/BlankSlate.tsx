import { RootLayoutProps } from '@/app/types/definitions'
import { Icon } from '@radix-ui/react-select';
import React from 'react'

export type Props = Readonly<{
    title?: React.ReactNode;
    icon?: React.ReactNode; //Drag an Icon to this placeholder
    content?: React.ReactNode; //Add the Blank Slate content to this placeholder
    actions: React.ReactNode; //Drag Buttons to this placeholder
}>


const BlankSlate = ({icon, content, actions, title}: Props) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
    <div className="flex items-center">
      <>
        {title}
      </>
    </div>
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <>
            {icon}
        </>
        <>
            {content}
        </>
        <>
            {actions}
        </>
      </div>
    </div>
  </main>
  )
}

export default BlankSlate

{/* <h3 className="text-2xl font-bold tracking-tight">
You have no products
</h3>

<p className="text-sm text-muted-foreground">
You can start selling as soon as you add a product.
</p> */}