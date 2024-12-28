import { Song } from "@/types/type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createSongFromYouTube = async (
  youtubeUrl: string
): Promise<Song | null> => {
  try {
    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      throw new Error("Invalid YouTube URL");
    }

    // Fetch video details from YouTube Data API (you need an API key for this)
    const apiKey = process.env.YOUTUBE_API_KEY; // Add your YouTube API key to the environment variables
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      throw new Error("Video not found");
    }

    const videoDetails = data.items[0].snippet;

    return {
      id: videoId,
      title: videoDetails.title,
      url: youtubeUrl,
      smallThumbnail: `https://i.ytimg.com/vi/${videoId}/default.jpg`,
      largeThumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      isActive: false,
      votes: [],
    };
  } catch (error) {
    console.error("Error creating song:", error);
    return null;
  }
};

// Helper function to extract the video ID from a YouTube URL
export const extractVideoId = (url: string): string | null => {
  try {
    const urlObj = new URL(url);

    // Check for `youtu.be` short URLs
    if (urlObj.hostname === "youtu.be") {
      return urlObj.pathname.slice(1); // Extract the path, removing the leading slash
    }

    // Check for `youtube.com` standard URLs
    if (urlObj.hostname.includes("youtube.com")) {
      return urlObj.searchParams.get("v"); // Extract the `v` parameter
    }

    return null; // Return null for invalid URLs
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
};
