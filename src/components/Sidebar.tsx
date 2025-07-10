"use client";
import NewDocumentButton from "./NewDocumentButton"
import { collectionGroup, DocumentData, query, where } from "firebase/firestore"
import { db } from "../../firebase";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
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
    <div className="flex flex-col h-full w-full ">
        <div className="bg-white min-h-[50px] flex justify-center items-center p-2">   
                {user && (
                    <div>
                        {user?.firstName}{`'s`} Space
                    </div>                 
                )}
        </div>  
    <div className="h-full p-4 bg-muted-foreground/15 flex flex-col gap-4 ">    
        <NewDocumentButton />
        <div className="flex flex-col gap-2">
            <h2 className="text-sm text-muted-foreground font-semibold">My Documents</h2>
            {   
                groupedData.owner.length === 0 ? (
                    <div className="text-center text-muted-foreground texi-semibold">
                        No Documents.
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 ">      
                        {groupedData.owner.map((doc) => (
                            <SideBarOption key = {doc.id} id = {doc.id} href = {`/doc/${doc.id}`}/>
                        ))}
                    </div>
                )
            }
        </div>
        <div className="flex flex-col gap-2">
            <h2 className="text-sm text-muted-foreground font-semibold">Shared with me</h2>
            {
                groupedData.editor.length === 0 ? (
                    <div className="text-center text-muted-foreground text-sm text-semibold">
                        No Documents
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        
                        {groupedData.editor.map((doc) => (
                            <SideBarOption key = {doc.id} id = {doc.id} href = {`/doc/${doc.id}`}/>
                        ))}
                    </div>
                )
            }
        </div>    
    </div>
    </div>
  )
}
export default Sidebar