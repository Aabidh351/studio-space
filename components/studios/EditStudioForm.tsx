
"use client";

import { useState, type FormEvent } from "react";
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

type Props = {
  categories: Category[];
  studio: Studio;
};

export default function EditStudioForm({ categories, studio }: Props) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(studio.title);
  const [category, setCategory] = useState(studio.category);
  const [hourlyRate, setHourlyRate] = useState(String(studio.hourlyRate));
  const [securityDeposit, setSecurityDeposit] = useState(
    String(studio.securityDeposit)
  );
  const [maxCapacity, setMaxCapacity] = useState(String(studio.maxCapacity));
  const [location, setLocation] = useState(studio.location);
  const [imageUrl, setImageUrl] = useState(studio.imageUrl);
  const [amenities, setAmenities] = useState(studio.amenities.join(", "));
  const [overview, setOverview] = useState(studio.overview);

  const user = session?.user;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to edit a studio.");
      return;
    }

    if (user.email !== studio.ownerEmail) {
      toast.error("You are not authorized to edit this studio.");
      return;
    }

    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/studios/${studio._id}`, {
        method: "PUT",
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
          ownerEmail: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update studio.");
      }

      toast.success("Studio updated successfully!");
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
    return (
      <p className="text-sm text-[#74766d]">
        Loading your information...
      </p>
    );
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
            <Input value={studio.ownerName} readOnly />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#292b27]">
              Host Email
            </label>
            <Input value={studio.ownerEmail} readOnly />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading || !user || categories.length === 0}
        className="w-full bg-[#344638] text-white hover:bg-[#29392d]"
      >
        {loading ? "Saving Changes..." : "Save Changes"}
      </Button>
    </form>
  );
}
