import React from 'react'

type ErrorProps = {
    entity?: string;
    error: Error | unknown;
    jsonString?: string;
}

const ErrorDetail = (props: ErrorProps) => {
  const errorMessage = props.error instanceof Error 
    ? props.error.message 
    : String(props.error);
    
  return (
    <>
        <span>Failed to update {props.entity || 'item'}</span>
        <i className="my-2 p-4">{errorMessage}</i>

        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{props.jsonString}</code>
        </pre>              
    </>
  )
}

export default ErrorDetail