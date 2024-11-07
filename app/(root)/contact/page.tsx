import { contactMethods } from '@/app/types/data'
import { SubmitButton } from '@/components/custom/submitFormButton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { contact } from '@/utils/actions/miscellaneous '
import React from 'react'

const page = () => {

  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto px-4  md:px-8">
          <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
              <div className="max-w-lg space-y-3">
                  <h3 className="text-indigo-600 font-semibold">
                    Contact
                  </h3>
                  <p className="text-3xl font-semibold sm:text-4xl">
                    Let's connect
                  </p>
                  <p>
                    Are you looking forward to building better solutions now or attract fresh talent for your team, contact me and lets get started! Please fill out the form, or use the contact information bellow .
                  </p>
                  <div>
                      <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center">
                        {
                          contactMethods.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-x-3">
                              <div className="flex-none">
                                {item.icon}
                              </div>
                              <p>{item.contact}</p>
                            </li>
                          ))
                        }
                      </ul>
                  </div>
              </div>
              <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
                  <form className="space-y-5">
                      <div>
                          <Label className="font-medium">
                            Full name
                          </Label>
                          <Input
                            type="text"
                            required
                            className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                          />
                      </div>
                      <div>
                          <Label className="font-medium">
                            Email
                          </Label>
                          <Input
                            type="email"
                            required
                            className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                          />
                      </div>
                      <div>
                          <Label className="font-medium">
                            Phone Number
                          </Label>
                            <Input
                              type="text"
                              required
                              className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                          

                      </div>
                      <div>
                          <Label className="font-medium">
                            Message
                          </Label>
                          <Textarea required placeholder='Type your message here.' className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"/>
                      </div>
                      <SubmitButton
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                        type="submit"
                        formAction={contact}
                      >
                        Submit
                      </SubmitButton>
                  </form>
              </div>
          </div>
      </div>
    </section>
  )
}

export default page