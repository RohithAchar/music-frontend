import { Song } from "@/types/type";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music2, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ActiveCardSong = ({ song }: { song: Song | null }) => {
  if (!song) return <div>No song</div>;

  return (
    <Card
      className={cn(
        "w-full max-w-md transition-all duration-300 hover:shadow-lg",
        song.isActive && "border-primary/15"
      )}
    >
      <CardContent className="p-0">
        <div className="relative aspect-video w-full">
          <Image
            fill
            src={song.largeThumbnail}
            alt={song.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {song.isActive && (
            <div className="absolute top-2 right-2">
              <Badge
                variant="default"
                className="bg-primary/90 backdrop-blur-sm"
              >
                <Music2 className="w-3 h-3 mr-1" />
                Now Playing
              </Badge>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold line-clamp-1 mb-2">
            {song.title}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground">
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span>{song.votes.length} votes</span>
            </div>

            <a
              href={song.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm"
            >
              View Source
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveCardSong;
