
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#292f28] px-5 pb-8 pt-16 text-[#f7f5ef] md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/15 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-4xl font-semibold"
            >
              StudioSpace<span className="text-[#b5c1aa]">.</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              A creative community connecting talented people with
              inspiring spaces. Find your space. Make something meaningful.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-[#b5c1aa]">
              Explore
            </h3>

            <div className="flex flex-col gap-4 text-sm text-white/70">
              <Link href="/studios" className="transition hover:text-white">
                All Studios
              </Link>
              <Link href="/#how-it-works" className="transition hover:text-white">
                How It Works
              </Link>
              <Link href="/#about" className="transition hover:text-white">
                About Us
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-[#b5c1aa]">
              For Hosts
            </h3>

            <div className="flex flex-col gap-4 text-sm text-white/70">
              <Link href="/add-studio" className="transition hover:text-white">
                List Your Space
              </Link>
              <Link href="/my-listings" className="transition hover:text-white">
                My Listings
              </Link>
              <Link href="/login" className="transition hover:text-white">
                Sign In
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-7 text-center text-xs text-white/50 sm:flex-row sm:text-left">
          <p>© 2026 StudioSpace. All rights reserved.</p>
          <p>Made for people who love to create.</p>
        </div>
      </div>
    </footer>
  );
}
