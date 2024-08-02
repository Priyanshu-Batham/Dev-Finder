import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/data-access/rooms";
import { SearchBar } from "./SearchBar";
import { RoomCard } from "@/components/room-card";
import { unstable_noStore } from "next/cache";

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  unstable_noStore();
  const rooms = await getRooms(searchParams.search);
  return (
    <main className="min-h-screen py-16 container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild>
          <Link href={"/create-room"}>Create Room</Link>
        </Button>
      </div>

      <div className="mb-12">
        <SearchBar />
      </div>

      <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1 max-md:grid-cols-2">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
