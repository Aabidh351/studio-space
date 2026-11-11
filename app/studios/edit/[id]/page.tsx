
import { redirect, notFound } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import EditStudioForm from "@/components/studios/EditStudioForm";

type Props = {
  params: Promise<{ id: string }>;
};

type Category = {
  _id: string;
  name: string;
};

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
};

async function getStudio(id: string): Promise<Studio | null> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/studios/${id}`,
      { cache: "no-store" }
    );

    if (!response.ok) return null;

    return response.json();
  } catch (error) {
    console.error("Failed to fetch studio:", error);
    return null;
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/categories`,
      { cache: "no-store" }
    );

    if (!response.ok) return [];

    return response.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export default async function EditStudioPage({ params }: Props) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const [studio, categories] = await Promise.all([
    getStudio(id),
    getCategories(),
  ]);

  if (!studio) notFound();

  if (studio.ownerEmail !== session.user.email) {
    redirect("/my-listings");
  }

  return (
    <main className="min-h-screen bg-[#f7f5ef] px-5 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#b66b50]">
            Host Dashboard
          </p>

          <h1 className="mt-2 font-heading text-4xl font-semibold text-[#292b27]">
            Edit Studio
          </h1>

          <p className="mt-3 text-[#74766d]">
            Update your studio information and keep your listing up to date.
          </p>
        </div>

        <EditStudioForm
          categories={categories}
          studio={studio}
        />
      </div>
    </main>
  );
}
