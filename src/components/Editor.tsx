import * as Y from 'yjs';
import { useEffect, useState } from 'react';
import {useRoom , useSelf} from "@liveblocks/react/suspense"
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from './ui/button';
import { MoonIcon, SunIcon } from 'lucide-react';
import {BlockNoteView} from '@blocknote/shadcn';
import "@blocknote/shadcn/style.css";
import "@blocknote/core/fonts/inter.css"
import { stringToColor } from '@/lib/stringToColor';
import { BlockNoteEditor } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { TranslateDocument } from './TranslateDocument';
import ChatToDocument from './ChatToDocument';

interface EditorProps {
    doc : Y.Doc;
    provider : any;
    darkMode: boolean;
};

function BlockNote({ doc, provider, darkMode }: EditorProps) {

    const userInfo = useSelf((me) => (me.info));

    const editor : BlockNoteEditor = useCreateBlockNote({
        collaboration : {
            provider ,
            fragment : doc.getXmlFragment("document-store"),
            user : {
                name : userInfo?.name!,
                color : stringToColor(userInfo?.email!),
            }
        }
    })

    return (
        <div className='relative'>
            <BlockNoteView
            theme={darkMode ? "dark" : "light"}
            editor = {editor}
            className='mt-8 max-w-5xl mx-auto'
            />
        </div>
        
    );
}
export function Editor() {

    const room = useRoom();
    const [doc , setDoc] = useState<Y.Doc>();
    const [provider , setProvider] = useState<LiveblocksYjsProvider>();
    const [darkMode , setDarkMode] = useState(false);

    useEffect(() => {  
        const ydoc = new Y.Doc();
        const yProvider = new LiveblocksYjsProvider(room, ydoc);
        setDoc(ydoc);
        setProvider(yProvider);

        return () => {
            yProvider?.destroy();
            ydoc?.destroy();
        }
    },[room])

        if(!doc || !provider) {
            return null;
        }

    const style = `hover:text-white ${
        darkMode ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700" 
                 : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
    }`

    return (
        <div>
            <div className="flex justify-end w-full max-w-6xl mx-auto gap-2 mt-8 ">                      
                <TranslateDocument doc = {doc}/>
                <ChatToDocument doc = {doc}/>
                <Button 
                className={style} 
                onClick={() => setDarkMode(!darkMode)}

                >
                    {darkMode ? <SunIcon/> : <MoonIcon />}
                </Button>
            </div>
            <BlockNote
                doc={doc}
                provider={provider}
                darkMode={darkMode}
            />
        </div>
    )
}
export default Editor