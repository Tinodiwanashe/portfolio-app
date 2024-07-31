'use server';

/*
    By adding the 'use server', you mark all the exported functions within the file as server functions. These server functions can then be imported into Client and Server components, making them extremely versatile.

    You can also write Server Actions directly inside Server Components by adding "use server" inside the action. 
*/
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { AuthRequiredError } from "@/lib/exceptions";


export const signInWithGoogle = async () => {
    const origin = headers().get("origin");
    console.log("Begin Google login...");
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
        redirectTo: `${origin}/auth/callback`,
        queryParams: {
            access_type: 'offline',
            prompt: 'consent'
        }
        }
    });

    if (error) {
        console.error(" Google login error occured: " + error);
        return redirect("/login?message=Could not authenticate user");
    }

    if (data.url) {
        console.log(" Google login Redirecting...");
        console.log(" Redirecting to:", data.url);
        revalidatePath('/', 'layout');
        return redirect(data.url); // use the redirect API for your server framework
    }
  };

export const signIn = async (formData: FormData) => {

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        console.error("Login Error: ", error);
        return redirect("/login?message=Could not authenticate user");
    }
    revalidatePath('/', 'layout');
    return redirect("/protected");
}

export const signUp = async (formData: FormData) => {

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const supabase = createClient();
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
            },
            });  

            if (error) {               
                throw new AuthRequiredError(error.message);
            } else {
                revalidatePath('/', 'layout');
                return redirect("/login?message=Check email to continue sign in process");
            }
    } catch (error) {
        console.log("Sign up error: ", error);
        return redirect("/login?message=Could not authenticate user");
    }

}

//req: NextRequest
export const signOut = async () => {   
    const supabase = createClient();
    // Check if a user's logged in
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (user) {
        await supabase.auth.signOut()
    } else {
        console.log("User is not logged in");
    }
    revalidatePath('/', 'layout');
    return redirect("/login");
/*     return NextResponse.redirect(new URL('/login', req.url), {
      status: 302,
    }) */
};

export const navigateToSignUp = async () => {
    revalidatePath('/', 'layout');
    return redirect("/signup");
}

export const navigateToLogin = async () => {
    revalidatePath('/', 'layout');
    return redirect("/login");
}