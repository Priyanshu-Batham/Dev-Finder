import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import { TagList } from "@/components/tag-list";
import { splitTags } from "@/lib/utils";

export function RoomCard({ room }: { room: Room }){
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <TagList tags={splitTags(room.tags)} />
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            target="_blank"
            className="flex items-center gap-2"
          >
            <GithubIcon />
            Github Project
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
