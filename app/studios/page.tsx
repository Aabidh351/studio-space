
import StudioFilters from "@/components/studios/StudioFilters";


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
  createdAt: string;
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

        <StudioFilters studios={studios} />
      </div>
    </section>
  );
}
