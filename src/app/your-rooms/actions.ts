'use server';

import { deleteRoom, getRoom } from "@/data-access/rooms";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function deleteRoomAction(roomId: string){
    const session = await getSession();

    // Authentication
    if(!session) throw new Error("User not authenticated");

    //Authorization
    const room = await getRoom(roomId);
    if(room?.userId !== session.user.id){
        throw new Error("User not Authorized");
    }

    await deleteRoom(roomId);
    revalidatePath("/your-rooms");
}