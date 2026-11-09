import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

type Studio = {
  _id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: number;
  createdAt: string;
};

async function getMyStudios(email: string): Promise<Studio[]> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/my-listings?ownerEmail=${encodeURIComponent(email)}`,
      { cache: "no-store" }
    );

    if (!response.ok) return [];

    return response.json();
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    return [];
  }
}

export default async function MyListingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const studios = await getMyStudios(session.user.email);

  return (
    <main className="min-h-screen bg-[#f7f5ef] px-5 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#b66b50]">
              Host Dashboard
            </p>

            <h1 className="mt-2 font-heading text-4xl font-semibold text-[#292b27]">
              My Listings
            </h1>

            <p className="mt-3 text-[#74766d]">
              Manage the creative spaces you've listed.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="rounded-full bg-[#344638] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#29392d]"
          >
            + Add New Studio
          </Link>
        </div>

        {studios.length === 0 ? (
          <div className="mt-12 border border-[#e4e1d7] bg-[#fdfcf9] px-6 py-16 text-center">
            <h2 className="text-xl font-semibold text-[#292b27]">
              No listings yet
            </h2>

            <p className="mt-2 text-sm text-[#74766d]">
              You haven't listed any studios yet.
            </p>

            <Link
              href="/add-studio"
              className="mt-6 inline-block rounded-full bg-[#344638] px-6 py-3 text-sm font-medium text-white"
            >
              List Your First Studio
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <div
                key={studio._id}
                className="border border-[#e4e1d7] bg-[#fdfcf9] p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[#b66b50]">
                  {studio.category}
                </p>

                <h2 className="mt-3 text-xl font-semibold text-[#292b27]">
                  {studio.title}
                </h2>

                <p className="mt-2 text-sm text-[#74766d]">
                  {studio.location}
                </p>

                <p className="mt-5 font-semibold text-[#344638]">
                  ৳{studio.hourlyRate}
                  <span className="text-sm font-normal text-[#74766d]">
                    {" "} / hour
                  </span>
                </p>

                <div className="mt-6 border-t border-[#e4e1d7] pt-4">
                  <Link
                    href={`/studios/${studio._id}`}
                    className="text-sm font-semibold text-[#344638] hover:text-[#b66b50]"
                  >
                    View Studio →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}