"use client";

import React, { useEffect, useRef } from "react";
import YouTube, { YouTubePlayer as YouTubePlayerType } from "react-youtube";
import { Card, CardContent } from "./ui/card";
import { Music2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface YouTubePlayerProps {
  songId?: string;
  className?: string;
  onEnd?: () => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  songId,
  className,
  onEnd,
}) => {
  const playerRef = useRef<YouTubePlayerType | null>(null);

  useEffect(() => {
    let wakeLock: WakeLockSentinel | null = null;

    const requestWakeLock = async () => {
      if ("wakeLock" in navigator) {
        try {
          wakeLock = await navigator.wakeLock.request("screen");
        } catch (err) {
          console.error(`Wake Lock error: ${err}`);
        }
      }
    };

    const releaseWakeLock = async () => {
      if (wakeLock) {
        try {
          await wakeLock.release();
          wakeLock = null;
        } catch (err) {
          console.error(`Wake Lock release error: ${err}`);
        }
      }
    };

    requestWakeLock();

    const handleVisibilityChange = () => {
      const player = playerRef.current;

      if (player && document.hidden) {
        // Play video when tab is hidden
        player.playVideo();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      releaseWakeLock();
    };
  }, []);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
      mute: 0,
      playsinline: 1,
      controls: 1,
      enablejsapi: 1,
      origin: window.location.origin,
      iv_load_policy: 3,
    },
  };

  if (!songId) return null;

  return (
    <Card
      className={cn(
        "w-full overflow-hidden bg-card/95 backdrop-blur",
        className
      )}
    >
      <CardContent className="p-2 sm:p-4">
        <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden shadow-lg">
          <div className="absolute top-4 left-4 z-10">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground">
              <Music2 className="w-4 h-4 animate-[pulse_2s_ease-in-out_infinite]" />
              <span className="text-sm font-medium">Now Playing</span>
            </div>
          </div>
          <YouTube
            ref={(player) =>
              (playerRef.current = player?.getInternalPlayer() || null)
            }
            videoId={songId}
            opts={opts}
            className="absolute inset-0"
            iframeClassName="absolute inset-0 w-full h-full"
            onEnd={onEnd}
            onReady={(event) => {
              const player = event.target;
              const qualities = player.getAvailableQualityLevels();
              if (qualities.length > 0) {
                player.setPlaybackQuality(qualities[0]); // Set highest quality
              }
              player.unMute();
              player.setVolume(100);
              player.playVideo();
            }}
            onPlay={(event) => {
              const player = event.target;
              const qualities = player.getAvailableQualityLevels();
              if (
                qualities.length > 0 &&
                player.getPlaybackQuality() !== qualities[0]
              ) {
                player.setPlaybackQuality(qualities[0]);
              }
            }}
            onStateChange={(event) => {
              if (event.data === 2 && document.hidden) {
                event.target.playVideo();
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default YouTubePlayer;
