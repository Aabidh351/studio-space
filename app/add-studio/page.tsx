import AddStudioForm from "@/components/studios/AddStudioForm";

type Category = {
  _id: string;
  name: string;
};

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${process.env.API_URL}/api/categories`, {
      cache: "no-store",
    });

    if (!response.ok) return [];

    return response.json();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export default async function AddStudioPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-[#f7f5ef] px-5 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#b66b50]">
            Become a Host
          </p>

          <h1 className="mt-3 font-heading text-4xl font-semibold text-[#292b27]">
            List Your Studio
          </h1>

          <p className="mt-3 text-[#74766d]">
            Share your creative space with people who need it.
          </p>
        </div>

        <AddStudioForm categories={categories} />
      </div>
    </main>
  );
}