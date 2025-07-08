"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteDocument } from "@/actions/actions";

function DeleteDocument() {

    const [isPending , startTransition] = useTransition();
    const [isOpen , setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleDelete = () => {
        const roomId = pathname.split("/").pop();
        if(!roomId){
            return;
        }

        startTransition(async () => {
            const {success} = await deleteDocument(roomId);
            setIsOpen(false);
            router.replace("/");
           
            if(success){
                toast.success("Room deleted successfully");
            }else{
                toast.error("Failed to delete room!")
            }
           
        })
    }

    return (
        <Dialog open = {isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant = "destructive">
                <DialogTrigger>Delete</DialogTrigger>
            </Button>  
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button 
                        variant = "destructive"
                        type = "button"
                        disabled = {isPending}
                        onClick = {handleDelete}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                    <DialogClose asChild>
                        <Button variant = "outline" disabled = {isPending}>
                           Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default DeleteDocument