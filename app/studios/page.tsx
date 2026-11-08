
import Image from "next/image";
import Link from "next/link";

type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  imageUrl: string;
  overview: string;
  maxCapacity: number;
  amenities: string[];
};

async function getStudios(): Promise<Studio[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/studios`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch studios");
    }

    return res.json();
  } catch (error) {
    console.error("Studios error:", error);
    return [];
  }
}

export default async function StudiosPage() {
  const studios = await getStudios();

  return (
    <section className="min-h-screen bg-[#f7f5ef] px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#71836d]">
            Explore Spaces
          </p>

          <h1 className="font-heading text-5xl font-medium text-[#292b27] md:text-6xl">
            Find Your Creative Space
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#74766d]">
            Discover inspiring studios and professional spaces for your next
            creative project.
          </p>
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between border-b border-[#e4e1d7] pb-4">
          <p className="text-sm text-[#74766d]">
            <span className="font-semibold text-[#292b27]">
              {studios.length}
            </span>{" "}
            studios available
          </p>
        </div>

        {/* Studio Grid */}
        {studios.length === 0 ? (
          <div className="py-24 text-center">
            <h2 className="font-heading text-3xl text-[#292b27]">
              No studios found
            </h2>
            <p className="mt-3 text-sm text-[#74766d]">
              Please check back later for available creative spaces.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <Link
                href={`/studios/${studio._id}`}
                key={studio._id}
                className="group overflow-hidden border border-[#e4e1d7] bg-[#fdfcf9] transition-shadow hover:shadow-lg"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-[#e9e8df]">
                  <Image
                    src={studio.imageUrl}
                    alt={studio.title}
                    fill
                    loading="eager"
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 bg-[#f7f5ef] px-3 py-1.5 text-xs font-semibold text-[#344638]">
                    {studio.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h2 className="font-heading text-2xl font-semibold text-[#292b27]">
                      {studio.title}
                    </h2>

                    <p className="shrink-0 text-sm font-semibold text-[#344638]">
                      ৳{studio.hourlyRate}
                      <span className="font-normal text-[#74766d]">/hr</span>
                    </p>
                  </div>

                  <p className="mb-4 text-sm text-[#74766d]">
                    {studio.location}
                  </p>

                  <p className="line-clamp-2 text-sm leading-6 text-[#74766d]">
                    {studio.overview}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#e4e1d7] pt-4 text-xs text-[#74766d]">
                    <span>Up to {studio.maxCapacity} people</span>
                    <span className="font-semibold text-[#344638]">
                      View Details →
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
