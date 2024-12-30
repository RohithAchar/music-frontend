"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Song } from "@/types/type";
import { createSongFromYouTube } from "@/lib/utils";

const AddSong = ({ addSong }: { addSong: (song: Song) => void }) => {
  const [input, setInput] = useState(""); // Stores the input YouTube link
  const [song, setSong] = useState<Song | null>(null); // Stores the fetched song object
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Controls the drawer visibility

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
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      {/* Drawer Trigger */}
      <DrawerTrigger
        className="fixed bottom-6 right-4 bg-primary text-primary-foreground p-4 rounded-full"
        onClick={() => setIsDrawerOpen(true)} // Open the drawer
      >
        <Plus className="w-4 h-4" />
      </DrawerTrigger>

      {/* Drawer Content */}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add song to the queue</DrawerTitle>
          <DrawerDescription>
            Add the YouTube link of the song.
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter>
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
                <DrawerDescription>
                  Please add the song link...
                </DrawerDescription>
              )}
            </CardContent>
          </Card>

          {/* Input for YouTube link */}
          <Input
            placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Button to add the song */}
          <Button
            disabled={!song}
            onClick={() => {
              if (song) {
                addSong(song); // Pass the song to the parent
                setInput(""); // Reset input
                setSong(null); // Reset song
                setIsDrawerOpen(false); // Close the drawer
              }
            }}
          >
            Add to queue
          </Button>

          {/* Button to close the drawer (Fixed nesting issue) */}
          <Button
            className="w-full"
            variant="outline"
            onClick={() => setIsDrawerOpen(false)} // Close the drawer
          >
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddSong;
