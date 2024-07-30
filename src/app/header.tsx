"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const session = useSession();
  return (
    <header>
      <div>
        {session.data? (
            <Button onClick={()=> signOut()}>Sign Out</Button>
        ): (
            <Button onClick={()=> signIn("google")}>Sign In</Button>
        )}
        <h1>{session.data?.user?.name}</h1>
        <ModeToggle />
      </div>
    </header>
  );
}
