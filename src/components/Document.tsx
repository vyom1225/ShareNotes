"use client";

import { FormEvent, useEffect, useState, useTransition } from "react"
import { Button } from "./ui/button"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Input } from "./ui/input";
import { useDocumentData } from "react-firebase-hooks/firestore";

function Document({id} : {id : string}) {

    const [isPending, startTransition] = useTransition();
    const [data , loading , error] = useDocumentData(doc(db, "documents", id));
    const [title, setTitle] = useState("");

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
    <div>
        <form onSubmit={updateTitle}>
            <Input  onChange = {((e) => setTitle(e.target.value))}/>
            <Button 
                disabled = {isPending} 
                type = "submit"
            >
                {isPending ? "Updating..." : "Update"}
            </Button>
        </form>
    </div>



  )
}
export default Document