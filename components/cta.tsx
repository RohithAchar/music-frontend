"use client";

import { signIn, useSession } from "next-auth/react";

const CTA = () => {
  const session = useSession();

  const createRoom = async () => {
    if (session.status === "unauthenticated") {
      await signIn();
    }
    if (!session.data?.user.id) return;
    window.location.href = `/${session.data?.user.id}`;
  };

  return (
    <div>
      <button onClick={createRoom}>Create Room</button>
    </div>
  );
};

export default CTA;
