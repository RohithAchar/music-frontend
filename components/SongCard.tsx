"use client";

import { Song } from "@/types/type";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";

const SongCard = ({
  song,
  handleVote,
}: {
  song: Song | null;
  handleVote: (song: Song) => void;
}) => {
  const session = useSession();
  const currentUserId = session.data?.user.id;
  if (!song) return <div>No song</div>;
  if (!currentUserId) return <div>No user</div>;

  const isVoted = song.votes.includes(currentUserId);

  return (
    <Card
      className={cn(
        "transition-all duration-300 hover:shadow-md border-primary/10"
      )}
    >
      <CardContent className="p-3 flex gap-3">
        <div className="w-32 flex-none">
          <div className="relative aspect-video">
            <Image
              fill
              src={song.smallThumbnail}
              alt={song.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
          <h3 className="font-medium line-clamp-1 text-[15px] mb-1">
            {song.title}
          </h3>

          <div className="flex items-center justify-between">
            <div
              onClick={() => handleVote(song)}
              className="flex items-center gap-1.5 text-muted-foreground cursor-pointer"
            >
              <ThumbsUp
                className="w-4 h-4"
                fill={isVoted ? "currentColor" : "none"}
              />
              <span className="text-sm">{song.votes.length} votes</span>
            </div>

            <a
              href={song.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline"
            >
              Source
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SongCard;
