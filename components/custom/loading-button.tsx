import { Button } from "@/components/ui/button";
import { ComponentProps, MouseEvent, ReactNode, Ref } from "react";
import { FaSpinner } from "react-icons/fa6";

type Props = ComponentProps<"button"> & {
  isLoading: boolean;
  loadingText?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
  size?: "default" | "sm" | "lg" | "icon";
};

export function LoadingButton({ children, loadingText, isLoading, ...props }: Props) {
  if (!props.variant) {
    props.variant = "default"; // default variant if not provided
  }

  if (!props.size) {
    props.size = "default"; // default variant if not provided
  }
  
  const buttonProps = {
    ...props,
    variant: props.variant,
    size: props.size,
    className: props.className,
    disabled: isLoading,
    "aria-disabled": isLoading,
    ref: undefined as Ref<HTMLButtonElement> | undefined
  }
  return (
    <Button {...buttonProps} >
      {isLoading && <FaSpinner className="animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  );
}
