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
};

async function getStudios(): Promise<Studio[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/studios`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch studios: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Studios fetch error:", error);
    return [];
  }
}

export default async function StudiosPage() {
  const studios = await getStudios();

  return (
    <section className="min-h-screen bg-[#f7f5ef] px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#71836d]">
            Find Your Space
          </p>

          <h1 className="mt-3 font-heading text-4xl font-medium text-[#292b27] md:text-5xl">
            Explore Studios
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#74766d]">
            Discover creative spaces designed to bring your ideas to life.
          </p>
        </div>

        {studios.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="font-heading text-2xl text-[#292b27]">
              No studios found
            </h2>
            <p className="mt-3 text-sm text-[#74766d]">
              There are currently no studios available.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <Link
                key={studio._id}
                href={`/studios/${studio._id}`}
                className="group overflow-hidden border border-[#e4e1d7] bg-[#fdfcf9]"
              >
                <div className="relative h-64 bg-[#e9e8df]">
                  {studio.imageUrl && (
                    <Image
                      src={studio.imageUrl}
                      alt={studio.title}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#71836d]">
                    {studio.category}
                  </p>

                  <h2 className="mt-2 font-heading text-2xl font-semibold text-[#292b27]">
                    {studio.title}
                  </h2>

                  <p className="mt-2 text-sm text-[#74766d]">
                    {studio.location}
                  </p>

                  <div className="mt-5 border-t border-[#e4e1d7] pt-4">
                    <p className="text-sm font-semibold text-[#344638]">
                      ৳{studio.hourlyRate.toLocaleString("en-BD")}
                      <span className="font-normal text-[#74766d]">
                        {" "}/ hour
                      </span>
                    </p>
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