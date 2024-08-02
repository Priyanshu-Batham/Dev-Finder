import { TagList } from "@/components/tag-list";
import { splitTags } from "@/lib/utils";
import { getRoom } from "@/data-access/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { DevFinderVideo } from "./video-player";
import { unstable_noStore } from "next/cache";

export default async function RoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  unstable_noStore();
  const roomId = params.roomId;
  const room = await getRoom(roomId);
  if (!room) return <div>No Room Found</div>;

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 min-h-screen">
        <div className="col-span-3 p-4 pr-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
            <DevFinderVideo room={room} />
          </div>
        </div>
        <div className="col-span-1 p-4 pl-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
            <h1 className="text-base">{room?.name}</h1>
            <p className="text-base text-gray-500">{room?.description}</p>
            {room.githubRepo && (
              <Link
                href={room.githubRepo}
                target="_blank"
                className="flex items-center gap-2 text-sm"
              >
                <GithubIcon />
                Github Project
              </Link>
            )}
            <TagList tags={splitTags(room.tags)} />
          </div>
        </div>
      </div>
    </div>
  );
}
