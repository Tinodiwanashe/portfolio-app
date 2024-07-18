import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function Logo({href, classNames} : {href: string; classNames?: string;}) {
  return (
    <Link href={href} className={cn(
      "flex items-center h-full",
      classNames
    )}>
      <Image src='/Logo.svg' alt="icons" width={140} height={30} />
    </Link>
  )
}
