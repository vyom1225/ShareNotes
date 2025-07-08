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

    const roomId = await params.id;
    return (
        <RoomProvider roomId = {roomId}>
             {children}
        </RoomProvider>
    )
}
