"use client"

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

function Header() {
    return (
       <div className="relative min-h-[50px] flex justify-center  items-center p-2 ">
            <div className="md:hidden absolute left-0 flex items-center ml-4 ">
                <Sheet>
                <SheetTrigger>
                    <Menu/>
                </SheetTrigger>
                <SheetContent side = "left" className="max-w-[50%]">
                    <Sidebar/>
                </SheetContent>
                </Sheet>
            </div>
            <Breadcrumbs/>      
            <div className="mr-4 rounded-md absolute right-0">
                <SignedOut>
                    <div className="text-primary-foreground bg-primary hover:bg-primary/90 rounded-md py-2 px-4">
                          <SignInButton/>
                    </div>          
                </SignedOut>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </div>
       </div>
    )
}
export default Header