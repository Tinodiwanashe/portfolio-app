import React from 'react'

type ErrorProps = {
    entity?: string;
    error: any;
    jsonString?: string;
}

const ErrorDetail = (props: ErrorProps) => {
  return (
    <>
        <span>Failed to update</span>
        <i className="my-2 p-4">{props.error}</i>

        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{props.jsonString}</code>
        </pre>              
    </>
  )
}

export default ErrorDetail