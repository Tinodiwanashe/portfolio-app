'use client' // Error components must be Client Components
 
import ErrorDisplay from '@/components/custom/ErrorDisplay'
import React, { useEffect } from 'react'
import * as Sentry from "@sentry/nextjs";
 
type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error(props: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    Sentry.captureException(props.error);
  }, [props.error])
 
  return (
    <>
     <ErrorDisplay message={props.error.message} reset={props.reset}/>
    </>
  )
}