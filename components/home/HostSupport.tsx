
import Image from "next/image";
import Link from "next/link";

export default function HostSupport() {
  return (
    <section id="about" className="bg-background px-5 py-20 md:px-10 lg:px-16">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="relative h-95 overflow-hidden rounded-xl md:h-120">
          <Image
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36"
            alt="Creative workspace with a welcoming atmosphere"
            fill
            unoptimized
            loading="eager"
            className="object-cover"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-[#71836d]">
            Built for creators
          </p>

          <h2 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            More Than Just a Space. A Place to Create.
          </h2>

          <p className="mt-6 text-base leading-8 text-muted-foreground">
            StudioSpace brings creative people and inspiring workspaces
            together. Whether you&apos;re an independent creator or a studio
            owner, we&apos;re here to make every collaboration easier.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e4e8df] dark:bg-[#30382f] text-lg text-primary">
                ✓
              </span>

              <div>
                <h3 className="font-semibold text-foreground">
                  Transparent Bookings
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Clear hourly pricing and booking information before you commit.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e4e8df] dark:bg-[#30382f] text-lg text-primary">
                ✓
              </span>

              <div>
                <h3 className="font-semibold text-foreground">
                  Direct Host Communication
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Connect with workspace owners about your creative needs.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e4e8df] dark:bg-[#30382f] text-lg text-primary">
                ✓
              </span>

              <div>
                <h3 className="font-semibold text-foreground">
                  Support for Creators
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  A platform designed to make creative collaboration accessible.
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/add-studio"
            className="mt-9 inline-flex items-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-[#26372a]"
          >
            Become a Host →
          </Link>
        </div>
      </div>
    </section>
  );
}
