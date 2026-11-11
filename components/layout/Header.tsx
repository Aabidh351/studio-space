
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, CalendarDays, LayoutDashboard } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About", href: "/#about" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    console.log("Logout button Clicked!");
  setLoggingOut(true);

  try {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
        onError: (context) => {
          console.error("Logout failed:", context.error);
          setLoggingOut(false);
        },
      },
    });
  } catch (error) {
    console.error("Logout failed:", error);
    setLoggingOut(false);
  }
};

  const profilePicture = (
    <Avatar className="h-10 w-10 border border-[#e4e1d7]">
      <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
      <AvatarFallback className="bg-[#344638] text-sm text-white">
        {user?.name?.charAt(0).toUpperCase() || "U"}
      </AvatarFallback>
    </Avatar>
  );

  const profileDropdown = (
  <DropdownMenu>
    <DropdownMenuTrigger
  aria-label="Open profile menu"
  className="rounded-full outline-none ring-offset-2 transition hover:ring-2 hover:ring-[#71836d]"
>
  {profilePicture}
</DropdownMenuTrigger>

    <DropdownMenuContent align="end" className="w-60">
      <div className="px-3 py-2">
        <p className="text-sm font-semibold text-[#292b27]">
          {user?.name}
        </p>
        <p className="truncate text-xs text-[#74766d]">
          {user?.email}
        </p>
      </div>

      <DropdownMenuSeparator />

      <DropdownMenuItem>
  <Link
    href="/my-listings"
    className="flex w-full items-center"
  >
    <LayoutDashboard className="mr-2 h-4 w-4" />
    My Listings
  </Link>
</DropdownMenuItem>

      <DropdownMenuItem>
  <Link
    href="/my-bookings"
    className="flex w-full items-center"
  >
    <CalendarDays className="mr-2 h-4 w-4" />
    My Bookings
  </Link>
</DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
  onClick={handleLogout}
  disabled={loggingOut}
  className="cursor-pointer text-red-600"
>
  <LogOut className="mr-2 h-4 w-4" />
  {loggingOut ? "Logging out..." : "Log out"}
</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e4e1d7] bg-[#f7f5ef]/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-3xl font-semibold tracking-tight text-[#344638]">
            StudioSpace
          </span>
          <span className="mb-1 h-2 w-2 rounded-full bg-[#b66b50]" />
        </Link>

        
        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#55584f] transition-colors hover:text-[#344638]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {!isPending && (
            <>
              {user ? (
                profileDropdown
              ) : (
                <div className="flex">
                  <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-[#344638] transition-colors hover:text-[#b66b50]"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-[#344638] transition-colors hover:text-[#b66b50]"
                >
                  Sign Up
                </Link>
                </div>
              )}

              <Link
                href="/add-studio"
                className="rounded-full bg-[#344638] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#29392d]"
              >
                List Your Space
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 md:hidden">
          {!isPending && user && profileDropdown}

          {!isPending && !user && (
            <div className="flex gap-3">
              <Link
              href="/login"
              className="text-sm font-medium text-[#344638]"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium text-[#344638]"
            >
              Sign Up
            </Link>
            </div>
            
          )}

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`h-0.5 w-6 bg-[#344638] transition-transform ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-[#344638] transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-[#344638] transition-transform ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-[#e4e1d7] bg-[#f7f5ef] px-5 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-[#55584f] hover:text-[#344638]"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/add-studio"
              onClick={() => setMenuOpen(false)}
              className="w-fit rounded-full bg-[#344638] px-5 py-2.5 text-sm font-medium text-white"
            >
              List Your Space
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
