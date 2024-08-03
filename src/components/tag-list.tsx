"use client";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";

export function TagList({ tags }: { tags: string[] }) {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          onClick={() => {
            router.push(`/browse/?search=${tag}`);
          }}
          key={tag}
          className="w-fit cursor-pointer"
          tabIndex={0}
          role="button"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
