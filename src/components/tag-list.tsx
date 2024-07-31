import { Badge } from "./ui/badge";

export function splitTags(tags: string){
    return tags.split(",").map((lang) => lang.trim());
}
export function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} className="w-fit">
          {tag}
        </Badge>
      ))}
    </div>
  );
}
