import { doc } from "firebase/firestore";
import Link from "next/link"
import {  useDocumentData } from "react-firebase-hooks/firestore"
import { db } from "../../firebase";
import { usePathname } from "next/navigation";
import path from "path";
import { pathToFileURL } from "url";

function SideBarOption({href , id } : {href: string, id: string}) {

    const [data , loading , error] = useDocumentData(doc(db , "documents" , id));
    const pathname = usePathname();
    const isActive = href.includes(pathname) && pathname !== '/';

    if(!data) return null;

    return (
        <Link
            href={href}
            className={` ${isActive ? 'bg-muted-foreground/15 text-semibold' : ""}`}
        >
            <div className="text-black truncate border-1 border-black p-2 rounded-md">{data.title}</div>
        </Link>
    )
}
export default SideBarOption