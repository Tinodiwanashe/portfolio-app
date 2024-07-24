'use client' // Error components must be Client Components
 
import ErrorDisplay from '@/components/ErrorDisplay'
import { useEffect } from 'react'
import * as Sentry from "@sentry/nextjs";
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);
 
  return (
    <>
     <ErrorDisplay message={error.message} reset={reset}/>
    </>
  )
}