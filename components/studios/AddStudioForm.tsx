"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Category = {
  _id: string;
  name: string;
};

type Props = {
  categories: Category[];
};

export default function AddStudioForm({ categories }: Props) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [amenities, setAmenities] = useState("");
  const [overview, setOverview] = useState("");

  const user = session?.user;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to list a studio.");
      return;
    }

    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/studios",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            category,
            hourlyRate: Number(hourlyRate),
            securityDeposit: Number(securityDeposit),
            maxCapacity: Number(maxCapacity),
            location,
            imageUrl,
            amenities: amenities
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
            overview,
            ownerName: user.name,
            ownerEmail: user.email,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to add studio.");
      }

      toast.success("Studio listed successfully!");
      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return <p className="text-sm text-[#74766d]">Loading your information...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-7 border border-[#e4e1d7] bg-[#fdfcf9] p-6 md:p-8"
    >
      <div>
        <h2 className="mb-5 text-lg font-semibold text-[#292b27]">
          Studio Information
        </h2>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#292b27]">
              Studio Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter studio name"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#292b27]">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm text-[#292b27] outline-none focus:ring-2 focus:ring-[#71836d]"
            >
              <option value="">Select a category</option>
              {categories.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            {categories.length === 0 && (
              <p className="mt-2 text-sm text-red-600">
                No categories available. Please check the categories API.
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#292b27]">
                Hourly Rate (BDT)
              </label>
              <Input
                type="number"
                min="1"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                placeholder="e.g. 1000"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#292b27]">
                Security Deposit (BDT)
              </label>
              <Input
                type="number"
                min="0"
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value)}
                placeholder="e.g. 2000"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#292b27]">
                Maximum Capacity
              </label>
              <Input
                type="number"
                min="1"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                placeholder="e.g. 10 people"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#292b27]">
                Location
              </label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. GEC Circle, Chattogram"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#292b27]">
              Image URL
            </label>
            <Input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter studio image URL"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#292b27]">
              Amenities
            </label>
            <Input
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              placeholder="Wi-Fi, Air Conditioning, Lighting"
              required
            />
            <p className="mt-2 text-xs text-[#74766d]">
              Separate each amenity with a comma.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#292b27]">
              Studio Overview
            </label>
            <Textarea
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              placeholder="Describe your studio and what makes it special..."
              rows={5}
              required
            />
          </div>
        </div>
      </div>

      <div className="border-t border-[#e4e1d7] pt-6">
        <h2 className="mb-4 text-lg font-semibold text-[#292b27]">
          Host Information
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#292b27]">
              Host Name
            </label>
            <Input value={user?.name || ""} readOnly />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#292b27]">
              Host Email
            </label>
            <Input value={user?.email || ""} readOnly />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading || !user || categories.length === 0}
        className="w-full bg-[#344638] text-white hover:bg-[#29392d]"
      >
        {loading ? "Publishing..." : "Publish Studio"}
      </Button>
    </form>
  );
}