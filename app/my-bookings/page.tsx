
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

import { auth } from "@/lib/auth";

type Booking = {
  _id: string;
  studioId: string;
  studioTitle: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  hourlyRate: number;
  securityDeposit: number;
  totalAmount: number;
  status: "Pending" | "Confirmed" | "Cancelled";
  createdAt: string;
};

async function getMyBookings(email: string): Promise<Booking[]> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/my-bookings?customerEmail=${encodeURIComponent(email)}`,
      { cache: "no-store" }
    );

    if (!response.ok) return [];

    return response.json();
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return [];
  }
}

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const bookings = await getMyBookings(session.user.email);

  return (
    <main className="min-h-screen bg-[#f7f5ef] px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b66b50]">
            Your Activity
          </p>
          <h1 className="mt-3 font-heading text-4xl font-semibold text-[#292b27]">
            My Bookings
          </h1>
          <p className="mt-3 text-sm text-[#74766d]">
            Manage and track your studio booking requests.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-xl border border-[#e4e1d7] bg-[#fdfcf9] px-6 py-16 text-center">
            <CalendarDays className="mx-auto h-10 w-10 text-[#a09e93]" />

            <h2 className="mt-5 font-heading text-2xl font-semibold text-[#292b27]">
              No bookings yet
            </h2>

            <p className="mt-2 text-sm text-[#74766d]">
              Your studio booking requests will appear here.
            </p>

            <Link
              href="/studios"
              className="mt-6 inline-block rounded-full bg-[#344638] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#435947]"
            >
              Explore Studios
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-xl border border-[#e4e1d7] bg-[#fdfcf9] p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-2xl font-semibold text-[#292b27]">
                      {booking.studioTitle}
                    </h2>

                    <p className="mt-2 text-sm text-[#74766d]">
                      Booking ID: {booking._id}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-xs font-semibold ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 border-t border-[#e4e1d7] pt-5 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-[#b66b50]" />
                    <div>
                      <p className="text-xs text-[#74766d]">Date</p>
                      <p className="mt-1 text-sm font-medium text-[#292b27]">
                        {new Date(`${booking.bookingDate}T00:00:00`).toLocaleDateString("en-BD", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock3 className="h-5 w-5 text-[#b66b50]" />
                    <div>
                      <p className="text-xs text-[#74766d]">Time</p>
                      <p className="mt-1 text-sm font-medium text-[#292b27]">
                        {booking.startTime} – {booking.endTime}
                        {" "}({booking.duration} hours)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-[#b66b50]" />
                    <div>
                      <p className="text-xs text-[#74766d]">Hourly Rate</p>
                      <p className="mt-1 text-sm font-medium text-[#292b27]">
                        ৳{booking.hourlyRate.toLocaleString("en-BD")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#e4e1d7] pt-5">
                  <div>
                    <p className="text-xs text-[#74766d]">Estimated Total</p>
                    <p className="mt-1 text-xl font-semibold text-[#344638]">
                      ৳{booking.totalAmount.toLocaleString("en-BD")}
                    </p>
                    <p className="mt-1 text-xs text-[#74766d]">
                      Security deposit: ৳{booking.securityDeposit.toLocaleString("en-BD")}
                    </p>
                  </div>

                  <Link
                    href={`/studios/${booking.studioId}`}
                    className="rounded-full border border-[#344638] px-5 py-2.5 text-sm font-semibold text-[#344638] transition hover:bg-[#344638] hover:text-white"
                  >
                    View Studio
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
