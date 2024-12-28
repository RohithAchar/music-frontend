"use client";

import ActiveCardSong from "@/components/ActiveSongCard";
import AddSongLarge from "@/components/AddSongLarge";
import AddSong from "@/components/AddSongMobile";
import { LoadingState } from "@/components/LoadingState";
import SongCard from "@/components/SongCard";
import { ModeToggle } from "@/components/ThemeToggleBtn";
import YouTubePlayer from "@/components/YoutubePlayer";
import IsMobile from "@/hooks/IsMobile";
import { Song } from "@/types/type";
import { signIn, useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Room = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [activeSong, setActiveSong] = useState<Song | null>(null);
  const session = useSession();
  const { roomId } = useParams();
  const isMobile = IsMobile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      signIn();
    }
  }, [session]);

  useEffect(() => {
    if (!socket) {
      try {
        const ws = new WebSocket("ws://localhost:8080");
        ws.onopen = () => {
          console.log("WebSocket connection established");
          setSocket(ws);
        };
        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
        ws.onclose = () => {
          console.log("WebSocket connection closed");
        };
      } catch (error) {
        console.log("WebSocket initialization error:", error);
      }
    }
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
    if (session.status === "unauthenticated") return;
    if (session.data?.user.id === undefined) return;

    if (roomId === session.data?.user.id) {
      socket?.send(
        JSON.stringify({
          type: "create_room",
          data: { id: session.data.user.id, name: session.data.user.name },
        })
      );
    } else {
      socket?.send(
        JSON.stringify({
          type: "join_room",
          data: { roomId },
        })
      );
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("message", message);
      if (message.type === "room_created") {
        console.log("room_created");
      } else if (message.type === "song_updated") {
        setSongs(message.data);
      } else if (message.type === "active_song") {
        setActiveSong(message.data);
      } else if (message.type === "song_added") {
        setSongs((prev) => [...prev, message.data]);
      }
    };
  }, [socket, session, roomId]);

  const handleToggleVote = (song: Song) => {
    if (session.data?.user.id === undefined) return;
    if (song.votes.includes(session.data?.user.id)) {
      socket?.send(
        JSON.stringify({
          type: "down_vote",
          data: {
            roomId: roomId,
            songId: song.id,
            userId: session.data?.user.id,
          },
        })
      );
    } else {
      socket?.send(
        JSON.stringify({
          type: "up_vote",
          data: {
            roomId: roomId,
            songId: song.id,
            userId: session.data?.user.id,
          },
        })
      );
    }
  };

  const addSong = (song: Song) => {
    socket?.send(
      JSON.stringify({
        type: "add_song",
        data: {
          roomId: roomId,
          song: song,
        },
      })
    );
  };

  const onEnd = () => {
    socket?.send(JSON.stringify({ type: "on_end", data: { roomId: roomId } }));
  };

  if (!isMounted) return null;
  if (!socket) return <LoadingState />;

  return (
    <div className="px-6 py-10 relative h-screen w-full max-w-screen-xl mx-auto">
      <div className="w-full flex justify-between">
        <h1>{session.data?.user.name}'s Room</h1>
        <ModeToggle />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2">
          {roomId === session.data?.user.id ? (
            <div>
              <h1 className="text-2xl font-bold mb-4">Currently playing</h1>
              {!activeSong?.id && <div>No song is playing</div>}
              <YouTubePlayer songId={activeSong?.id} onEnd={onEnd} />
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-4">Currently playing</h1>
              <ActiveCardSong song={activeSong} />
            </div>
          )}
        </div>
        {!isMobile && <AddSongLarge addSong={addSong} />}
      </div>

      {isMobile && <AddSong addSong={addSong} />}
      <div className="space-y-4 mt-6">
        <h1 className="text-2xl font-bold">Up Next</h1>
        {songs.length <= 1 && <div>No songs in queue</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {songs.map(
            (song) =>
              !song.isActive && (
                <SongCard
                  song={song}
                  key={song.id}
                  handleVote={handleToggleVote}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;
