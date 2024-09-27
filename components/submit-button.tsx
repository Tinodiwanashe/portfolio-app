"use client";

import { useFormStatus } from "react-dom";
import { Ref, type ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

type Props = ComponentProps<"button"> & {
  loadingText?: string;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
};

export function SubmitButton({ children, loadingText, ...props }: Props) {
  const { pending, action } = useFormStatus();
  // The useFormStatus hook exposes a pending boolean that can be used to show a loading indicator while the action is being executed.

  if(!props.variant){
    props.variant = "default"; // default variant if not provided
  }
  const isLoading = pending && action === props.formAction;

  return (
    <Button variant={props.variant } {...props} type="submit" className={props.className} aria-disabled={isLoading} ref={undefined as Ref<HTMLButtonElement> | undefined}>
      {isLoading && (<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />)}
      {isLoading ? loadingText : children}
    </Button>
  );
}
