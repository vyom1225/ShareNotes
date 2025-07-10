import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";

import { toast } from "sonner";

import { Input } from "./ui/input";

import * as Y from "yjs"
import { BotIcon, MessageCircleCode } from "lucide-react";
import Markdown from "react-markdown";

function ChatToDocument({doc} : {doc : Y.Doc}) {

    const [isPending , startTransition] = useTransition();
    const [isOpen , setIsOpen] = useState(false);
    const [summary , setSummary] = useState("");
    const [question , setQuestion] = useState("");
    const [input , setInput ] = useState("");
  

    const handleAskQuestion = async (e : FormEvent) => {
        e.preventDefault();

        setQuestion(input);

        startTransition(async () => {
            const documentData = doc.get("document-store").toJSON();
            try{
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument` , {
                        method : "POST",
                        headers : {
                            "Content-Type" : "application/json",
                        },
                        body : JSON.stringify({
                            documentData,
                            question : input,
                        })
                    }
                )
    
                if(res.ok){
                    const {message} = await res.json();

                    setInput("");
                    setSummary(message);
                    toast.success("Question asked Successfully");
                }
            }catch(error){
                toast.error("Question could not be asked right now")
            }
        })

    }

    return (
        <Dialog open = {isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant = "outline">
                <DialogTrigger>
                    <MessageCircleCode/>
                    Chat To Document
                </DialogTrigger>
            </Button>  
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Chat to the Document!</DialogTitle>
                <DialogDescription>
                    Ask a question and chat to the document with AI
                </DialogDescription>

                {question && 
                    <p className="text-sm text-gray-500">Q: {question}</p>
                }
                </DialogHeader>

                {summary && (
                    <div>
                        <div>
                            <BotIcon/>
                            <p>GPT {isPending ? "is thinking..." : "Says:"}</p>
                        </div>
                        <p>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</p>
                    </div>
                    
                )}



                <form onSubmit = {handleAskQuestion} className="flex  gap-2">
                    <Input
                        type = "text"
                        placeholder = "i.e. what is this about"
                        value = {input} 
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button 
                        type = "submit"
                        disabled = {!input || isPending}
                    >
                        {isPending ? "Asking..." : "Ask"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default ChatToDocument