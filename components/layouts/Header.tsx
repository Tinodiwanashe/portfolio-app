"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { FaBars } from "react-icons/fa"
import Logo from '../Logo';
import { Button } from "../ui/button"
import { ModeToggle } from "../tutorial/ModeToggle"
import { menuItems, socials } from "@/app/types/data"
import Menu from "./Menu"

//you cannot export an async functioon within a client component. The solution here is to use the use state and use effect hook
 const Header = ({
    children
  }: {
    children: React.ReactNode;
  }) => {

/*     //determines whether the user has an active session/user is logedIn
    const [session, setSession] = useState<any | null>(null);

    useEffect(() => {
      const fetchSession = async () => {
        const supabase = createClient();
        const { data, error } =  await supabase.auth.refreshSession();
        if (error) {
          console.error("Error fetching session:", error);
        } else {
          setSession(data.session);
        }
      }
      fetchSession();
    }, []) */

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' >
      <div className="container h-14 max-w-screen-2xl flex items-center">
        <div className='mr-4 hidden md:flex lg:flex'>
          <div className="flex justify-between w-full min-[825px]:hidden">

            
          </div>
          <Sheet >
            <SheetTrigger className="p-2 transition">
                <FaBars />
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Next Starter</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-3 mt-[1rem]">
                  <Menu menuItems={menuItems} orientation="vertical"/>
                  {/*<DialogClose asChild>
                        <Link href="/dashboard" legacyBehavior passHref className="cursor-pointer">
                            <Button variant="outline">
                                Dashboard
                            </Button>
                        </Link>
                  </DialogClose> */}
                </div>
            </SheetContent>
          </Sheet>
          <Logo href= '/' classNames = 'mr-6 space-x-2'/> 
          <Menu menuItems={menuItems} orientation="horizontal"/>
        </div>
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-2 md:justify-end">
          {
            socials.map((item, index) => {
              return (
                <Button 
                  className="h-[2.3rem] w-[2.3rem]"
                  variant="outline" 
                  size={"icon"}
                  key={index}
                >
                  {item.icon}
                </Button>
              )
            })
          }
          <ModeToggle/>
          {children}
        </div>
      </div>
    </header>

  )
}

export default Header;



