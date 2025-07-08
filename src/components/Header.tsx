"use client"

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

function Header() {
    const {user} = useUser();


    return (
       <div className="flex justify-between items-center p-2 border-b-1 border-secondary">
            <div>   
                {user && (
                <h1>
                    {user?.firstName}{`'s`} Space
                </h1>
                )}
            </div>      
            <div>
                <SignedOut>
                    <SignInButton/>
                </SignedOut>
                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </div>
       </div>
    )
}
export default Header