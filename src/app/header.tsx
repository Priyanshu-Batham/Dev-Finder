"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogInIcon, LogOutIcon, SchoolIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

function AccountDropdown() {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"}>
          <Avatar className="mr-2">
            <AvatarImage src={session.data?.user.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
          <LogOutIcon className="mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
    <header className="bg-gray-100 dark:bg-gray-900 container mx-auto py-2 z-10 relative">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex gap-5 items-center text-xl font-bold">
          <Image
            src={"/icon.png"}
            height={50}
            width={50}
            alt="App icon of a magnifying glass"
          />
          <h1>DEV FINDER</h1>
        </Link>

        <nav>
          {isLoggedIn && (
            <div className="flex gap-2">
              <Link
                className="text-xl hover:text-gray-400 flex gap-2"
                href="/browse"
              >
                Browse
              </Link>

              <Link
                className="text-xl hover:text-gray-400 flex gap-2"
                href="your-rooms"
              >
                Your Rooms
                <SchoolIcon />
              </Link>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
            <Button onClick={() => signIn("google")}>
              <LogInIcon className="mr-2" /> SignIn
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
