"use client";

import { signIn, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { extractId } from "@/lib/utils";
import toast from "react-hot-toast";

const CTA = () => {
  const [input, setInput] = useState("");
  const session = useSession();

  const createRoom = async () => {
    if (session.status === "unauthenticated") {
      await signIn();
    }
    if (!session.data?.user.id) return;
    window.location.href = `/${session.data?.user.id}`;
  };

  const onJoin = () => {
    if (!input) return;
    const id = extractId(input);
    if (!id) {
      toast.error("Invalid room id");
    }
    window.location.href = `/${id}`;
  };

  return (
    <div className="space-y-4 md:my-8">
      <Button className="w-full" onClick={createRoom}>
        Create Stream
      </Button>
      <div className="grid grid-cols-4 gap-2">
        <Input
          placeholder="Enter the room id or url"
          className="col-span-3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={onJoin} variant={"outline"} className="col-span-1">
          Join
        </Button>
      </div>
    </div>
  );
};

export default CTA;
