"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Link2, PhoneIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const shareUrl = window.location.href; // Replace with your actual share URL

export function SocialShare() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openShareWindow = (url: string) => {
    window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this page</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="link"
              defaultValue={shareUrl}
              readOnly
              className="col-span-3"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={handleCopyLink}
          >
            <span className="sr-only">Copy</span>
            <Link2 className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-center text-muted-foreground">
          {copied ? "Copied!" : "Click to copy link"}
        </p>
        <div className="flex justify-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="w-9 px-0"
            onClick={() =>
              openShareWindow(
                `https://wa.me/?text=${encodeURIComponent(shareUrl)}`
              )
            }
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="sr-only">Share on WhatsApp</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-9 px-0"
            onClick={() =>
              openShareWindow(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}`
              )
            }
          >
            <Facebook className="h-4 w-4" />
            <span className="sr-only">Share on Facebook</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-9 px-0"
            onClick={() =>
              openShareWindow(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  shareUrl
                )}`
              )
            }
          >
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Share on Twitter</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-9 px-0"
            onClick={() =>
              openShareWindow(
                `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  shareUrl
                )}`
              )
            }
          >
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">Share on LinkedIn</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
