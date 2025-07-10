"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { inviteUserToDocument } from "@/actions/actions";
import { Input } from "./ui/input";

function InviteUsers() {

    const [isPending , startTransition] = useTransition();
    const [isOpen , setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const pathname = usePathname();
  

    const handleInvite = () => {
        const roomId = pathname.split("/").pop();
        if(!roomId){
            return;
        }

        startTransition(async () => {
            const {success} = await inviteUserToDocument(roomId , email);
            setIsOpen(false);
           
           
            if(success){
                setIsOpen(false);
                setEmail("");
                toast.success("User Invited successfully");
            }else{
                toast.error("Failed to invite the user!")
            }
           
        })
    }

    return (
        <Dialog open = {isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant = "outline">
                <DialogTrigger>Invite</DialogTrigger>
            </Button>  
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Invite a User to collaborate</DialogTitle>
                <DialogDescription>
                    Enter the email address of the user you want to invite to this document.
                </DialogDescription>
                </DialogHeader>
                <form onSubmit = {handleInvite} className="flex gap-2">
                    <Input
                        placeholder = "Enter email address"
                        value = {email}
                        type = "email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button 
                        variant = "outline"
                        type = "submit"
                        disabled = {isPending}
                    >
                        {isPending ? "Inviting" : "Invite"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default InviteUsers