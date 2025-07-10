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
import { toast } from "sonner";
import { removeUserFromDocument } from "@/actions/actions";
import { useRoom } from "@liveblocks/react";
import useOwner from "@/lib/useOwner";
import { useUser } from "@clerk/nextjs";
import { collectionGroup, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

function ManageUsers() {

    const [isPending , startTransition] = useTransition();
    const [isOpen , setIsOpen] = useState(false);
    const room = useRoom();
    const isOwner = useOwner();
    const {user} = useUser();

    const [usersInRoom] = useCollection(
        room && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
    );
  

    const handleRemoveUser = (userId : string) => {
        startTransition(async () => {
            if(!user) return;

            const {success} = await removeUserFromDocument(room.id , userId);

            if(success){           
                toast.success("User removed from room successfully");
            }else{
                toast.error("Failed to remove user from the room!")
            }
           
        })
    }

    return (
        <Dialog open = {isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant = "outline">
                <DialogTrigger>Users ({usersInRoom?.docs.length})</DialogTrigger>
            </Button>  
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Users with Access</DialogTitle>
                <DialogDescription>
                   Below is a list of users who have access to this document.
                </DialogDescription>
                </DialogHeader>

                <div>
                    {usersInRoom?.docs.map((doc) => (
                        <div 
                            key = {doc.data().userId}
                            className="flex justify-between items-center"
                        >
                            <p>
                                {doc.data().userId === user?.emailAddresses[0].toString()
                                    ? `You (${doc.data().userId}`
                                    : doc.data().userId
                                }
                            </p>
                             <Button variant = "outline" >{doc.data().role}</Button>

                             {isOwner && doc.data().userId !== user?.emailAddresses[0].toString()
                                && (
                                    <Button 
                                        variant = "destructive"
                                        onClick = {() => handleRemoveUser(doc.data().userId)}
                                        disabled = {isPending}
                                    >  
                                        {isPending ? "Removing..." : "X"}
                                    </Button> 
                                )}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default ManageUsers