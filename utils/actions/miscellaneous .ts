"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

    export const redirectToURL = async (path: string) => {
        revalidatePath(path);
        redirect(path);
    }

    export const contact = async () => {    
        alert('Contact form submitted')
      }