import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function Logo({href, classNames, ...props} : {href: string; classNames?: string;}) {
  return (
    <Link href={href} className={cn(
      "flex items-center h-full",
      classNames
    )}>
      <Image src='/Logo.svg' alt="App Logo" width={140} height={30} {...props} priority/>
    </Link>
  )
}
