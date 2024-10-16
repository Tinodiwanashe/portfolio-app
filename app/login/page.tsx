import Link from "next/link";
import Image from "next/image";
import { SubmitButton } from "../../components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signInWithGoogle, signUp } from "./actions";
import { buttonVariants } from "@/components/ui/button";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      
      <form className="flex items-center justify-center py-12">
        <Link
          className={buttonVariants({ variant: "secondary" }) + " absolute right-4 top-4 md:right-8 md:top-8 z-10"} 
          href={"/"}
        >
          Home
        </Link>
        <div className="mx-auto grid w-[350px] gap-6">

          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <SubmitButton 
              formAction={signIn}
              className=""
              loadingText="Signing In..."
            >
              Login
            </SubmitButton>
            <SubmitButton 
              formAction={signUp}
              className=""
              loadingText="Signing Up..."
            >
              Signup
            </SubmitButton>
            <SubmitButton
              formAction={signInWithGoogle}
              className="bg-gradient-to-r from-green-400 to-blue-500  rounded-md px-4 py-2 text-white mb-2"
              loadingText="Signing In..."
            >
              Sign In with Google
            </SubmitButton>            
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link className="underline" href={"#"}>
              Sign up
            </Link>
          </div>
        </div>
      </form>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        
      </div>
    </div>
  );
}
