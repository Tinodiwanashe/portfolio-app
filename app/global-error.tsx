'use client'

import ErrorDisplay from "@/components/custom/ErrorDisplay";
import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import React, { useEffect } from "react";

 
export default function GlobalError({
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
    <html>
      <body>
        <ErrorDisplay message={"Global error"} reset={reset}/>
      </body>
    </html>
  )
}