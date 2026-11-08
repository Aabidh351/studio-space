
import Image from "next/image";
import Link from "next/link";

type Category = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  order: number;
};

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.API_URL}/api/categories`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    return res.json();
  } catch (error) {
    console.error("Categories error:", error);
    return [];
  }
}

export default async function Categories() {
  const categories = await getCategories();

  return (
    <section className="bg-[#f7f5ef] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#71836d]">
              Find Your Space
            </p>

            <h2 className="font-heading text-4xl font-medium text-[#292b27] md:text-5xl">
              Explore by Category
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#74766d]">
              Discover the perfect creative environment for your next project.
            </p>
          </div>

          <Link
            href="/studios"
            className="text-sm font-semibold text-[#344638] underline underline-offset-4"
          >
            Browse studios by catagory
          </Link>
        </div>

        {categories.length === 0 ? (
          <p className="py-12 text-center text-[#74766d]">
            No categories available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/studios?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <div className="relative h-64 overflow-hidden bg-[#e9e8df] md:h-72">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    loading="eager"
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="font-heading text-3xl font-medium text-white">
                      {category.name}
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-white/80">
                      {category.description}
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
