import React from 'react'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button';

const ErrorDisplay = ({
    message, 
    reset
}: {
    message: string; 
    reset: () => void;
}) => {
  return (
    <main className='grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8'>
    <div className='text-center'>
      <p className='text-base font-semibold text-primary dark:text-purple'>
        There was a problem
      </p>
      <h1 className='mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl'>
        {message || 'Something went wrong'}
      </h1>
      <p className='mt-6 text-base leading-7 text-zinc-600 dark: text-zinc-400'>
        Please try again later or contact support if the problem persists
      </p>
      <div className='mt-10 flex items-center justify-center gap-x-6'>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
        <Link href={'/'} className={buttonVariants({variant: 'outline'})}>
          Return to Homepage
        </Link>
      </div>
    </div>
  </main>
  )
}

export default ErrorDisplay