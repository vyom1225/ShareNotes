import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../firebase-admin";

export async function POST(req : NextRequest) {
    auth.protect();

    const {sessionClaims} = await auth();
    console.log(sessionClaims);
    const {room} = await req.json();

    const session = liveblocks.prepareSession(sessionClaims?.email! , {
        userInfo : {
            name : sessionClaims?.fullName!,
            email : sessionClaims?.email!,
            avatar : sessionClaims?.avatar!,
        }
    })

    const usersInRoom = await adminDb
        .collectionGroup("rooms")
        .where("userId" , "==" , sessionClaims?.email)
        .get();

    const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

    if(userInRoom?.exists){
        session.allow(room , session.FULL_ACCESS);
        const {body , status } = await session.authorize();

        return new Response(body , {status});
    }else{
        return NextResponse.json(
            {message : "You are not allowed to access this room."},
            {status : 403}
        )
    }
}