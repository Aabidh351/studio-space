
"use client";

import { useState } from "react";
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
  createdAt: string;
  maxCapacity: number;
  amenities: string[];
};

type Props = {
  studios: Studio[];
};

export default function StudioFilters({ studios }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  const categories = [
    "All",
    ...new Set(studios.map((studio) => studio.category)),
  ];

  const filteredStudios = studios.filter((studio) => {
    const matchesCategory =
      category === "All" || studio.category === category;

    const query = search.toLowerCase();

    const matchesSearch =
      studio.title.toLowerCase().includes(query) ||
      studio.location.toLowerCase().includes(query) ||
      studio.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  if (sort === "low") {
    filteredStudios.sort((a, b) => a.hourlyRate - b.hourlyRate);
  } else if (sort === "high") {
    filteredStudios.sort((a, b) => b.hourlyRate - a.hourlyRate);
  } else {
    filteredStudios.sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    );
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search by studio name, location or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full border border-[#e4e1d7] bg-[#fdfcf9] px-5 py-3 text-sm outline-none focus:border-[#71836d]"
      />

      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`border px-4 py-2 text-xs font-medium transition ${
                category === item
                  ? "border-[#344638] bg-[#344638] text-white"
                  : "border-[#e4e1d7] bg-[#fdfcf9] text-[#74766d] hover:border-[#344638]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-[#e4e1d7] bg-[#fdfcf9] px-4 py-2.5 text-sm text-[#292b27] outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <p className="mb-6 text-sm text-[#74766d]">
        <span className="font-semibold text-[#292b27]">
          {filteredStudios.length}
        </span>{" "}
        studios found
      </p>

      {filteredStudios.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="font-heading text-3xl text-[#292b27]">
            No studios found
          </h2>

          <p className="mt-3 text-sm text-[#74766d]">
            Try changing your search or category.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
              setSort("newest");
            }}
            className="mt-5 text-sm font-semibold text-[#344638] underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStudios.map((studio) => (
            <Link
              href={`/studios/${studio._id}`}
              key={studio._id}
              className="group overflow-hidden border border-[#e4e1d7] bg-[#fdfcf9] transition-shadow hover:shadow-lg"
            >
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
    </>
  );
}
