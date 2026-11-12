
import Image from "next/image";
import Link from "next/link";

const categories = [
  "Photo Studio",
  "Podcast Room",
  "Film Stage",
  "Music Suite",
  "Art Workshop",
];

export default function Footer() {
  return (
    <footer className="bg-[#292f28] px-5 pb-8 pt-16 text-[#f7f5ef] md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-white/15 pb-12 sm:grid-cols-2 lg:grid-cols-5">

          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="StudioSpace logo"
                width={42}
                height={42}
                loading="eager"
                className="h-10 w-10 object-contain"
              />
              <span className="text-3xl font-semibold">
                StudioSpace<span className="text-[#b5c1aa]">.</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              A creative community connecting talented people with inspiring
              spaces. Find your space. Make something meaningful.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <Link
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="text-white/60 transition hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-5-7.5L5.4 22H2.2l7.3-8.4L1.8 2h6.4l4.5 6.8L18.9 2Zm-1.1 18h1.7L7.3 3.9H5.5L17.8 20Z" />
                </svg>
              </Link>

              <Link
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/60 transition hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="0.8" fill="currentColor" />
                </svg>
              </Link>

              <Link
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/60 transition hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2H7.3V13h2.8v8h3.4Z" />
                </svg>
              </Link>
            </div>
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
              <Link href="/my-bookings" className="transition hover:text-white">
                My Bookings
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-[#b5c1aa]">
              Popular Categories
            </h3>

            <div className="flex flex-col gap-4 text-sm text-white/70">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/studios?category=${encodeURIComponent(category)}`}
                  className="transition hover:text-white"
                >
                  {category}
                </Link>
              ))}
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
              <Link href="/booking-requests" className="transition hover:text-white">
                Booking Requests
              </Link>
              <Link href="/login" className="transition hover:text-white">
                Sign In
              </Link>
            </div>
          </div>
        </div>


        <div className="flex flex-col items-center justify-between gap-4 pt-7 text-center text-xs text-white/50 sm:flex-row sm:text-left">
          <p>© 2026 StudioSpace. All rights reserved.</p>

          <p>
            By using StudioSpace, you agree to our terms and conditions.
          </p>

          <p>Made for people who love to create.</p>
        </div>
      </div>
    </footer>
  );
}
