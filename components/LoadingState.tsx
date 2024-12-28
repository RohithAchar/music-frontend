"use client";

import { Music } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <Music className="h-6 w-6 animate-pulse text-indigo-600 dark:text-indigo-400" />
          <span className="text-lg font-medium">Connecting to room...</span>
        </div>
      </div>
    </div>
  );
};
