import React from 'react'
import { FaRotateRight } from 'react-icons/fa6'

const loading = () => {
  return (
    <main className='grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8'>
    <div className='text-center'>
      <div className='mt-10 flex items-center justify-center gap-x-6'>
        <div className='animate-spin'><FaRotateRight/></div>
      </div>
    </div>
  </main>
  )
}

export default loading
