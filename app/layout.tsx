import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./provider";

export const metadata: Metadata = {
  title: "NextQ",
  description:
    "Host music rooms, invite your friends, and let the crowd decide what's played next! Add songs, vote for favorites, and enjoy a seamless group listening experience.",
};

// Load Poppins font with desired configuration
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // Add desired font weights
  variable: "--font-poppins", // CSS variable name
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
