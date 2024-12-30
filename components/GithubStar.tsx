import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function GitHubStar() {
  return (
    <div className="space-y-4 mt-10">
      <h2 className="text-xl md:text-2xl font-medium opacity-70">
        Support Our Project
      </h2>
      <div className="bg-primary/10 rounded-lg p-6 space-y-4">
        <p className="text-sm">
          If you like our project, please consider giving it a star on GitHub.
          Your support helps us grow and improve!
        </p>
        <Button asChild className="w-full">
          <a
            href="https://github.com/RohithAchar/music-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2"
          >
            <Github className="w-5 h-5" />
            <span>Star on GitHub</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
