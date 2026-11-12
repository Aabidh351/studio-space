
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  studio: {
    _id: string;
    title: string;
    hourlyRate: number;
    securityDeposit: number;
    ownerEmail: string;
  };
};

export default function BookingForm({ studio }: Props) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  const user = session?.user;

  const duration =
    startTime && endTime && endTime > startTime
      ? (
          (new Date(`1970-01-01T${endTime}:00`).getTime() -
            new Date(`1970-01-01T${startTime}:00`).getTime()) /
          (1000 * 60 * 60)
        )
      : 0;

  const totalAmount = duration * studio.hourlyRate;

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to book this studio.");
      router.push(`/login?redirect=/studios/${studio._id}`);
      return;
    }

    if (bookingDate < minDate) {
      toast.error("Please select a future date.");
      return;
    }

    if (startTime <= new Date().toTimeString().slice(0, 5) &&
        bookingDate === minDate) {
      toast.error("Please select a future start time.");
      return;
    }

    if (!duration) {
      toast.error("End time must be later than start time.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studioId: studio._id,
          bookingDate,
          startTime,
          endTime,
          customerName: user.name,
          customerEmail: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit booking.");
      }

      toast.success("Booking request submitted successfully!");
      router.push("/my-bookings");
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
      <p className="text-center text-sm text-[#74766d]">
        Loading booking options...
      </p>
    );
  }

  if (!user) {
    return (
      <>
        <Button className="h-auto w-full rounded-none bg-[#344638] px-6 py-4 text-sm font-semibold text-white hover:bg-[#435947]"
        >
          <a href={`/login?redirect=/studios/${studio._id}`}>
            Log in to Book
          </a>
        </Button>

        <p className="mt-4 text-center text-xs text-[#74766d]">
          You need an account to request a booking.
        </p>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-[#292b27]">
          Booking Date
        </label>
        <Input
          type="date"
          min={minDate}
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#292b27]">
            Start Time
          </label>
          <Input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#292b27]">
            End Time
          </label>
          <Input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            min={startTime || undefined}
            required
          />
        </div>
      </div>

      {duration > 0 && (
        <div className="space-y-2 border-y border-[#e4e1d7] py-4 text-sm">
          <div className="flex justify-between text-[#74766d]">
            <span>Duration</span>
            <span>{duration} hours</span>
          </div>

          <div className="flex justify-between text-[#74766d]">
            <span>Estimated Total</span>
            <span className="font-semibold text-[#344638]">
              ৳{totalAmount.toLocaleString("en-BD")}
            </span>
          </div>

          <div className="flex justify-between text-[#74766d]">
            <span>Security Deposit</span>
            <span>৳{studio.securityDeposit.toLocaleString("en-BD")}</span>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={loading || !bookingDate || !startTime || !endTime || !duration}
        className="h-auto w-full rounded-none bg-[#344638] px-6 py-4 text-sm font-semibold text-white hover:bg-[#435947]"
      >
        {loading ? "Submitting..." : "Request Booking"}
      </Button>

      <p className="text-center text-xs leading-5 text-[#74766d]">
        Your booking request will remain pending until the host confirms it.
      </p>
    </form>
  );
}
