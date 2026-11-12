
import Image from "next/image";
import Link from "next/link";

type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  imageUrl: string;
};

async function getFeaturedStudios(): Promise<Studio[]> {
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/studios/featured`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch studios");
    }

    return await res.json();
  } catch (error) {
    console.error("Featured studios error:", error);
    return [];
  }
}

export default async function FeaturedStudios() {
  const studios = await getFeaturedStudios();

  return (
    <section className="bg-background px-5 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[3px] text-[#71836d]">
              Curated spaces
            </p>

            <h2 className="text-4xl font-semibold text-foreground md:text-5xl">
              Featured Studios
            </h2>

            <p className="mt-3 max-w-lg text-sm text-muted-foreground md:text-base">
              Discover inspiring spaces designed to bring your creative ideas to life.
            </p>
          </div>

          <Link
            href="/studios"
            className="text-sm font-semibold text-primary underline underline-offset-4"
          >
            Explore all studios
          </Link>
        </div>

        {studios.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            No studios available right now.
          </p>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <Link
                href={`/studios/${studio._id}`}
                key={studio._id}
                className="group overflow-hidden rounded-xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={studio.imageUrl}
                    alt={studio.title}
                    fill
                    loading="eager"
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#71836d]">
                    {studio.category}
                  </p>

                  <h3 className=" text-2xl font-semibold text-foreground">
                    {studio.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {studio.location}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <p className="text-sm font-semibold text-primary">
                      ৳{studio.hourlyRate}
                      <span className="font-normal text-muted-foreground"> / hour</span>
                    </p>

                    <span className="text-sm font-semibold text-primary">
                      View details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
