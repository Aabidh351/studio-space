
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  bookingId: string;
  ownerEmail: string;
};

export default function BookingActions({ bookingId, ownerEmail }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const updateStatus = async (status: "Confirmed" | "Cancelled") => {
    const action = status === "Confirmed" ? "confirm" : "reject";

    if (!window.confirm(`Are you sure you want to ${action} this booking?`)) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ownerEmail, status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update booking.");
      }

      toast.success(data.message);
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => updateStatus("Confirmed")}
        disabled={loading}
        className="rounded-full bg-[#344638] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#435947] disabled:opacity-50"
      >
        {loading ? "Please wait..." : "Confirm"}
      </button>

      <button
        type="button"
        onClick={() => updateStatus("Cancelled")}
        disabled={loading}
        className="rounded-full border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
      >
        Reject
      </button>
    </div>
  );
}
