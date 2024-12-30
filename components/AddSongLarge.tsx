"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Song } from "@/types/type";
import { createSongFromYouTube } from "@/lib/utils";

const AddSongLarge = ({ addSong }: { addSong: (song: Song) => void }) => {
  const [input, setInput] = useState(""); // Stores the input YouTube link
  const [song, setSong] = useState<Song | null>(null); // Stores the fetched song object

  // Fetch the song when the input changes
  useEffect(() => {
    if (!input) return; // Only run if input is not empty

    const debounceTimeout = setTimeout(async () => {
      // Fetch song after debounce delay
      const fetchedSong = await createSongFromYouTube(input);
      setSong(fetchedSong);
    }, 500); // Debounce delay of 500ms (adjust as needed)

    // Cleanup the previous timeout if input changes before the delay is over
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [input]);

  return (
    <div className="p-4 max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Add song to the queue</h2>
      <p className="mb-4">Add the YouTube link of the song below.</p>

      {/* Card to display song thumbnail */}
      <Card>
        <CardContent className="aspect-video w-full relative overflow-hidden rounded-lg bg-muted flex items-center justify-center">
          {song ? (
            <Image
              fill
              src={
                song?.largeThumbnail ||
                "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
              }
              alt="youtube"
              className="object-cover"
            />
          ) : (
            <p>Please add the song link...</p>
          )}
        </CardContent>
      </Card>

      {/* Input for YouTube link */}
      <Input
        className="mt-4"
        placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Button to add the song */}
      <Button
        className="mt-4 w-full"
        disabled={!song}
        onClick={() => {
          if (song) {
            addSong(song); // Pass the song to the parent
            setInput(""); // Reset input
            setSong(null); // Reset song
          }
        }}
      >
        Add to queue
      </Button>
    </div>
  );
};

export default AddSongLarge;
