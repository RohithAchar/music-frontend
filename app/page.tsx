import CTA from "@/components/cta";
import Hero from "@/components/Hero";
import ModeToggle from "@/components/ThemeToggleBtn";
import Image from "next/image";
import Features from "@/components/Features";
import GitHubStar from "@/components/GithubStar";

const Home = () => {
  return (
    <div className="px-6 py-8 bg-background mx-auto w-screen max-w-2xl">
      <div className="flex justify-end w-full">
        <ModeToggle />
      </div>
      <Hero />
      <CTA />

      <div className="space-y-4 mt-10">
        <h2 className="text-xl md:text-2xl font-medium opacity-70">
          How it works
        </h2>
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <Image width={24} height={24} src={"/home.png"} alt="home" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Stream</p>
            <p className="text-sm text-muted-foreground">
              Create a stream or join an existing one.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <Image
            width={24}
            height={24}
            src={"/romantic-music.png"}
            alt="home"
          />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Add Song</p>
            <p className="text-sm text-muted-foreground">
              Add your favorite songs to the queue.
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <Image width={24} height={24} src={"/ballot.png"} alt="home" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Vote Song</p>
            <p className="text-sm text-muted-foreground">
              Highest voted song will be played next.
            </p>
          </div>
        </div>
      </div>
      <Features />
      <GitHubStar />
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} YourAppName. All rights reserved.</p>
        <p>
          Built with ❤️ by{" "}
          <a
            href="https://github.com/RohithAchar"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Rohith Achar
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
