import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

export default async function DocLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params : {id: string}
}) {
    auth.protect();

    const {id} = await params;
    return (
       <RoomProvider roomId = {id}> 
             {children}
        </RoomProvider>
    )
}
