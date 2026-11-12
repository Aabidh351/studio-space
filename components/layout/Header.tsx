
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  CalendarDays,
  LayoutDashboard,
  ClipboardList,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";

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
  const { theme, setTheme } = useTheme();

  const user = session?.user;

  const themeToggle = (
  <button
    type="button"
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    aria-label="Toggle theme"
    title="Toggle theme"
    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
  >
    <Moon className="hidden h-5 w-5 dark:block" />
    <Sun className="block h-5 w-5 dark:hidden" />
  </button>
);

  const handleLogout = async () => {
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
    <Avatar className="h-10 w-10 border border-border">
      <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
      <AvatarFallback className="bg-primary text-sm text-primary-foreground">
        {user?.name?.charAt(0).toUpperCase() || "U"}
      </AvatarFallback>
    </Avatar>
  );

  const profileDropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open profile menu"
        className="rounded-full outline-none ring-offset-2 transition hover:ring-2 hover:ring-ring"
      >
        {profilePicture}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-60 border-border bg-popover text-popover-foreground"
      >
        <div className="px-3 py-2">
          <p className="text-sm font-semibold text-foreground">
            {user?.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {user?.email}
          </p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href="/my-listings" className="flex w-full items-center">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            My Listings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/my-bookings" className="flex w-full items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            My Bookings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href="/booking-requests" className="flex w-full items-center">
            <ClipboardList className="mr-2 h-4 w-4" />
            Booking Requests
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={loggingOut}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {loggingOut ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-3xl font-semibold tracking-tight text-primary">
            StudioSpace
          </span>
          <span className="mb-1 h-2 w-2 rounded-full bg-[#b66b50]" />
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {themeToggle}

          {isPending ? (
            <span className="text-sm text-muted-foreground">
              Loading account...
            </span>
          ) : (
            <>
              {user ? (
                profileDropdown
              ) : (
                <div className="flex">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <Link
                href="/add-studio"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                List Your Space
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 md:hidden">
          {themeToggle}

          {isPending ? (
            <span className="text-xs text-muted-foreground">
              Loading...
            </span>
          ) : user ? (
            profileDropdown
          ) : (
            <div className="flex gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-foreground"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-foreground"
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
              className={`h-0.5 w-6 bg-foreground transition-transform ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-foreground transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-foreground transition-transform ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-border bg-background px-5 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/add-studio"
              onClick={() => setMenuOpen(false)}
              className="w-fit rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              List Your Space
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
