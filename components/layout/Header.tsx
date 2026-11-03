
"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About", href: "/#about" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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


        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-[#344638] transition-colors hover:text-[#b66b50]"
          >
            Log in
          </Link>
          <Link
            href="/add-studio"
            className="rounded-full bg-[#344638] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#29392d]"
          >
            List Your Space
          </Link>
        </div>


        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-0.5 w-6 bg-[#344638] transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-[#344638] transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-[#344638] transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
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

            <div className="flex flex-col gap-3 border-t border-[#e4e1d7] pt-5">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-[#344638]"
              >
                Log in
              </Link>
              <Link
                href="/add-studio"
                onClick={() => setMenuOpen(false)}
                className="w-fit rounded-full bg-[#344638] px-5 py-2.5 text-sm font-medium text-white"
              >
                List Your Space
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
