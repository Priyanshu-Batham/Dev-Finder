"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DeleteIcon,
  LogInIcon,
  LogOutIcon,
  SchoolIcon,
  SearchIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { deleteAccountAction } from "./action";

function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Delete Account Confirmation */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any rooms associated with the account in Dev Finder.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Actual Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"secondary"}>
            <Avatar className="sm:mr-2">
              <AvatarImage src={session.data?.user.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="max-sm:hidden">{session.data?.user?.name}</div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href="/browse">
            <DropdownMenuItem className="sm:hidden">
              <div className="hover:text-gray-400 flex gap-2">
                <SearchIcon />
                Browse
              </div>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <Link href="/your-rooms">
            <DropdownMenuItem className="sm:hidden">
              <div className="hover:text-gray-400 flex gap-2">
                <SchoolIcon />
                Your Rooms
              </div>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOutIcon className="mr-2" />
            Sign Out
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <DeleteIcon className="mr-2" />
            Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
    <header className="bg-gray-100 dark:bg-gray-900 py-2 z-10 relative">
      <div className="flex justify-between items-center  container mx-auto">
        {/* Dev Finder Heading and Icon */}
        <Link href="/" className="flex gap-5 items-center text-xl font-bold">
          <Image
            src={"/icon.png"}
            height={50}
            width={50}
            alt="App icon of a magnifying glass"
          />
          <h1 className="max-sm:hidden">DEV FINDER</h1>
        </Link>

        {/* Browse and Your Rooms links */}
        <nav className="max-sm:hidden">
          {isLoggedIn && (
            <div className="flex gap-8">
              <Link
                className="text-xl hover:text-gray-400 flex gap-2"
                href="/browse"
              >
                <SearchIcon />
                Browse
              </Link>

              <Link
                className="text-xl hover:text-gray-400 flex gap-2"
                href="/your-rooms"
              >
                <SchoolIcon />
                Your Rooms
              </Link>
            </div>
          )}
        </nav>

        {/* Account Dropdown and Mode Toggle */}
        <div className="flex items-center gap-4 max-sm:gap-2">
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
