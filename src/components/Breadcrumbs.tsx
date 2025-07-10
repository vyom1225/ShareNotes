import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { doc } from "firebase/firestore";
import { usePathname } from "next/navigation"
import { Fragment } from "react";
import { useDocumentData} from "react-firebase-hooks/firestore";
import { db } from "../../firebase";

function Breadcrumbs() {
    // const path = usePathname();
    // const segments = path.split("/")
    // let data = {
    //     title : ""
    // }
    // if(segments.length > 2){
    //     const id = segments[segments.length -1];
    //     let [data , loading , error] = useDocumentData(doc(db, "documents", id));
    //     console.log(data);
    // }
   
    return (
       <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            {/* {
                segments.length > 2 && (
                    <>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbPage>{data?.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                )
            } */}
        </BreadcrumbList>
        </Breadcrumb>
    )
}
export default Breadcrumbs