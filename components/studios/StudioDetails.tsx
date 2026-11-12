
import Image from "next/image";
import Link from "next/link";
import BookingForm from "@/components/studios/BookingForm";

type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  imageUrl: string;
  amenities: string[];
  overview: string;
  ownerName: string;
  ownerEmail: string;
  createdAt: string;
};

async function getStudio(id: string): Promise<Studio | null> {
  try {
    const res = await fetch(
      `${process.env.API_URL}/api/studios/${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("Failed to fetch studio:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Studio details error:", error);
    return null;
  }
}

export default async function StudioDetails({ id }: { id: string }) {
  const studio = await getStudio(id);

  if (!studio) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f7f5ef] px-6 text-center">
        <h1 className="font-heading text-4xl text-[#292b27]">
          Studio Not Found
        </h1>

        <p className="mt-3 text-sm text-[#74766d]">
          This studio may have been removed or is no longer available.
        </p>

        <Link
          href="/studios"
          className="mt-6 bg-[#344638] px-6 py-3 text-sm font-medium text-white"
        >
          Explore Studios
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f7f5ef] px-6 py-12 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/studios"
          className="mb-8 inline-block text-sm text-[#74766d] hover:text-[#344638]"
        >
          ← Back to Studios
        </Link>

        
        <div className="relative mb-10 h-75 overflow-hidden bg-[#e9e8df] md:h-125">
          {studio.imageUrl && (
            <Image
              src={studio.imageUrl}
              alt={studio.title}
              fill
              priority
              unoptimized
              className="object-cover"
            />
          )}
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#71836d]">
              {studio.category}
            </p>

            <h1 className="font-heading text-4xl font-medium text-[#292b27] md:text-5xl">
              {studio.title}
            </h1>

            <p className="mt-4 text-sm text-[#74766d]">
              {studio.location}
            </p>

            {/* Overview */}
            <div className="my-8 border-y border-[#e4e1d7] py-6">
              <h2 className="mb-4 font-heading text-2xl font-semibold text-[#292b27]">
                About This Space
              </h2>

              <p className="whitespace-pre-line text-sm leading-8 text-[#74766d]">
                {studio.overview}
              </p>
            </div>

            <div>
              <h2 className="mb-5 font-heading text-2xl font-semibold text-[#292b27]">
                Amenities & Facilities
              </h2>

              {studio.amenities?.length ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {studio.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="border border-[#e4e1d7] bg-[#fdfcf9] px-4 py-4 text-sm text-[#52564d]"
                    >
                      {amenity}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#74766d]">
                  No amenities listed.
                </p>
              )}
            </div>

            <div className="mt-10 border-t border-[#e4e1d7] pt-8">
              <h2 className="mb-4 font-heading text-2xl font-semibold text-[#292b27]">
                Hosted By
              </h2>

              <p className="text-base font-semibold text-[#292b27]">
                {studio.ownerName}
              </p>

              <p className="mt-1 text-sm text-[#74766d]">
                {studio.ownerEmail}
              </p>
            </div>
          </div>

          <aside>
            <div className="sticky top-8 border border-[#e4e1d7] bg-[#fdfcf9] p-6">
              <p className="text-sm text-[#74766d]">Hourly rate</p>

              <p className="mt-1 font-heading text-4xl font-semibold text-[#344638]">
                ৳{studio.hourlyRate.toLocaleString("en-BD")}
                <span className="font-sans text-sm font-normal text-[#74766d]">
                  {" "}/ hour
                </span>
              </p>

              <div className="my-6 space-y-4 border-y border-[#e4e1d7] py-5">
                <div className="flex justify-between text-sm">
                  <span className="text-[#74766d]">Security Deposit</span>
                  <span className="font-semibold text-[#292b27]">
                    ৳{studio.securityDeposit.toLocaleString("en-BD")}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#74766d]">Maximum Capacity</span>
                  <span className="font-semibold text-[#292b27]">
                    {studio.maxCapacity} people
                  </span>
                </div>
              </div>

              <BookingForm
              studio={{
                _id: studio._id,
                title: studio.title,
                hourlyRate: studio.hourlyRate,
                securityDeposit: studio.securityDeposit,
                ownerEmail: studio.ownerEmail,
                }} />

              <p className="mt-4 text-center text-xs leading-5 text-[#74766d]">
                Booking requests are subject to host confirmation.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
