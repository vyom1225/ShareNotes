
import * as Y from "yjs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { FormEvent, useState, useTransition } from "react";
import { BotIcon, LanguagesIcon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { toast } from "sonner";
import Markdown from "react-markdown"


type Language =
  | "English"
  | "Mandarin"
  | "Hindi"
  | "Spanish"
  | "French"
  | "Arabic"
  | "Bengali"
  | "Russian"
  | "Portuguese";

const languages: Language[] = [
  "English",
  "Mandarin",
  "Hindi",
  "Spanish",
  "French",
  "Arabic",
  "Bengali",
  "Russian",
  "Portuguese"
];


export function TranslateDocument({doc} : {doc : Y.Doc}){

    const [isOpen , setIsOpen] = useState(false);
    const [isPending , startTransition] = useTransition();
    const [language , setLanguage] = useState<string>("");
    const [summary , setSummary] = useState<string>("");
    const [question , setQuestion] = useState<string>("");

    const handleAskQuestions = (e : FormEvent) => {
        e.preventDefault();

        startTransition(async ()=>{
            const documentData = doc.get("document-store").toJSON();
            try{
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument` , {
                        method : "POST",
                        headers : {
                            "Content-Type" : "application/json",
                        },
                        body : JSON.stringify({
                            documentData,
                            targetLang : language
                        })
                    }
                )
    
                if(res.ok){
                    const {translated_text} = await res.json();
                    setSummary(translated_text);
                    toast.success("Translated Summary successfully!");
                }
            }catch(error){
                toast.error("Couldnot translate the Document Currently")
            }
           
        })

    }
    return (
         <Dialog open = {isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant = "outline">
                <DialogTrigger>
                    <LanguagesIcon/>
                     Translate
                </DialogTrigger>
            </Button>  
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Translate the Document</DialogTitle>
                <DialogDescription>
                    Select a Language and AI will translate a summary of the document in the selected language.
                </DialogDescription>
                    {question && <p>question</p>}
                </DialogHeader>

                {summary && (
                    <div>
                        <div>
                            <BotIcon/>
                            <p>GPT {isPending ? "is thinking..." : "Says"}</p>
                        </div>
                        <p>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</p>
                    </div>
                    
                )}

                <form onSubmit = {handleAskQuestions}>
                    <Select
                        value = {language}
                        onValueChange={(value) => setLanguage(value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Language" />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map((language) => (
                                <SelectItem key = {language} value = {language}>
                                    {language.charAt(0).toUpperCase() + language.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button 
                        variant = "outline"
                        type = "submit"
                        disabled = {isPending || !language}
                    >
                        {isPending ? "Translating..." : "Translate"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}