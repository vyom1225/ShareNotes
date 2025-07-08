"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import NewDocumentButton from "./NewDocumentButton"
import { collectionGroup, DocumentData, query, where } from "firebase/firestore"
import { db } from "../../firebase";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { group } from "console";
import SideBarOption from "./SideBarOption";


interface RoomDocument extends DocumentData{
    createdAt: string;
    role : "owner" | "editor";
    roomId: string;
    userId : string;
}

function Sidebar() {

   const {user} = useUser();

   const [groupedData, setGroupedData] = useState<{
        owner: RoomDocument[];
        editor : RoomDocument[];
    }>({
        owner: [],
        editor: [],
    });

   const [data , loading ,error] = useCollection(
        user && 
            query(
                collectionGroup(db , "rooms"),
                where("userId", "==", user.emailAddresses[0].toString()),
            )
   )

   useEffect(() => {
     if(!data) return;

     const grouped = data.docs.reduce<{
        owner : RoomDocument[];
        editor : RoomDocument[];
     }>((acc, curr) => {

        const roomData = curr.data() as RoomDocument;

        if (roomData.role === "owner") {
            acc.owner.push({
                id : curr.id,
                ...roomData,
            });
        } else if (roomData.role === "editor") {
            acc.editor.push({
                id : curr.id,
                ...roomData,});
        }
        return acc;
     }, {
        owner: [],
        editor : [],
     });

     setGroupedData(grouped);
   },[data])

  return (
    <div className="max-w-[400px] border-r-1 border-secondary">
        <div className="md:hidden">
            <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
            </Sheet>
        </div>
        <NewDocumentButton/>
        <h2 className="text-lg font-semibold mt-4">My Documents</h2>
        {   
            groupedData.owner.length === 0 ? (
                <div className="text-center text-muted-foreground mt-4">
                    You have no rooms as an owner.
                </div>
            ) : (
                <div>
                   
                    {groupedData.owner.map((doc) => (
                        <SideBarOption key = {doc.id} id = {doc.id} href = {`/doc/${doc.id}`}/>
                    ))}
                </div>
            )
        }
        <h2 className="text-lg font-semibold mt-4">Shared with me</h2>
        {
            groupedData.editor.length === 0 ? (
                <div className="text-center text-muted-foreground mt-4">
                    No Documents Found
                </div>
            ) : (
                <div>
                    
                    {groupedData.editor.map((doc) => (
                        <SideBarOption key = {doc.id} id = {doc.id} href = {`/doc/${doc.id}`}/>
                    ))}
                </div>
            )
        }
    </div>
  )
}
export default Sidebar