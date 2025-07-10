"use client";

import { FormEvent, useEffect, useState, useTransition } from "react"
import { Button } from "./ui/button"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Input } from "./ui/input";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUsers from "./InviteUsers";
import ManageUsers from "./ManageUsers";
import { Avatars } from "./Avatars";
import { TranslateDocument } from "./TranslateDocument";
import ChatToDocument from "./ChatToDocument";

function Document({id} : {id : string}) {

    const [isPending, startTransition] = useTransition();
    const [data , loading , error] = useDocumentData(doc(db, "documents", id));
    const [title, setTitle] = useState("");
    const isOwner = useOwner();

    useEffect(() => {
        if(data){
            setTitle(data.title);
        }
    },[data]);

    const updateTitle = (e : FormEvent) => {
        e.preventDefault();
       
        if(title.trim()){
            startTransition(async () => {
                await updateDoc(doc(db , "documents", id), {
                    title : title
                });
            });
        }
    }
  return (
    <div className="flex-1 flex flex-col bg-muted-foreground/10 h-full min-h-[calc(100vh-50px)]  p-4">
        <div className="bg-white p-4 min-h-[calc(100vh-50px-32px)] space-y-4">
            <div className="flex w-full max-w-6xl mx-auto gap-2">
                <form onSubmit={updateTitle} className="flex-1 flex gap-2">
                    <Input  
                        onChange = {((e) => setTitle(e.target.value))}
                        placeholder="Update Title of the Document"
                    />
                    <Button 
                        disabled = {isPending} 
                        type = "submit"
                    >
                        {isPending ? "Updating..." : "Update"}
                    </Button>
                </form>
                {isOwner && (
                    <div className="flex gap-2">
                        <InviteUsers/>
                        <DeleteDocument/>
                    </div>
                )}
            </div>     
            <div className="w-full flex justify-between max-w-6xl mx-auto ">
                <ManageUsers/>
                <Avatars/>
            </div>
            <div className="border-1 border-muted-foreground/10"></div>
            <Editor/> 
        </div>
    </div>



  )
}
export default Document