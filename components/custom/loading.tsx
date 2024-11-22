import { ThemeProvider } from 'next-themes'

const loading = () => {
  return (
    <main className='h-screen grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8'>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className='text-center'>
          <div className='mt-10 flex flex-col items-center justify-center gap-x-6'>
              <div className="flex flex-row space-x-16">
                  <div className="flex">
                      <div className="relative">
                          {/* <!-- Outer Ring--> */}
                          <div className="w-12 h-12 rounded-full absolute border-8 border-solid border-gray-200 dark:border-black-200">
                          </div>

                          {/* <!-- Inner Ring --> */}
                          <div className="w-12 h-12 rounded-full animate-spin absolute border-8 border-solid border-purple-500 border-t-transparent shadow-md">
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>        
      </ThemeProvider>

  </main>
  )
}

export default loading
