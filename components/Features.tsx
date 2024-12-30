import { CheckCircle } from "lucide-react";

const features = [
  "Create and join music streams",
  "Collaborate on playlists in real-time",
  "Vote for the next song to be played",
  "Discover new music with friends",
  "Seamless integration with popular music services",
  "Create custom themes for your streams",
  "Share your favorite tracks on social media",
  "Enjoy high-quality audio streaming",
];

export default function Features() {
  return (
    <div className="space-y-4 mt-10">
      <h2 className="text-xl md:text-2xl font-medium opacity-70">
        Key Features
      </h2>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
