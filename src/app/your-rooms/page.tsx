import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserRooms } from "@/data-access/rooms";
import { UserRoomCard } from "./user-room-card";
import { unstable_noStore } from "next/cache";

export default async function YourRoomsPage() {
  unstable_noStore();
  const rooms = await getUserRooms();
  return (
    <main className="min-h-screen py-16 container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Your Rooms</h1>
        <Button asChild>
          <Link href={"/create-room"}>Create Room</Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1 max-md:grid-cols-2">
        {rooms.map((room) => (
          <UserRoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
