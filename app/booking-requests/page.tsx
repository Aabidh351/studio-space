import BookingActions from "@/components/bookings/BookingActions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { CalendarDays, Clock3, UserRound } from "lucide-react";

import { auth } from "@/lib/auth";

type Booking = {
  _id: string;
  studioId: string;
  studioTitle: string;
  customerName: string;
  customerEmail: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  hourlyRate: number;
  securityDeposit: number;
  totalAmount: number;
  status: "Pending" | "Confirmed" | "Cancelled" | "Completed";
  createdAt: string;
};

async function getBookingRequests(email: string): Promise<Booking[]> {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/booking-requests?ownerEmail=${encodeURIComponent(email)}`,
      { cache: "no-store" }
    );

    if (!response.ok) return [];

    return response.json();
  } catch (error) {
    console.error("Failed to fetch booking requests:", error);
    return [];
  }
}

export default async function BookingRequestsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const bookings = await getBookingRequests(session.user.email);

  return (
    <main className="min-h-screen bg-background px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b66b50]">
            Host Dashboard
          </p>

          <h1 className="mt-3 font-heading text-4xl font-semibold text-foreground">
            Booking Requests
          </h1>

          <p className="mt-3 text-sm text-muted-foreground">
            Review booking requests for your studios.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-xl border border-border bg-card px-6 py-16 text-center">
            <CalendarDays className="mx-auto h-10 w-10 text-[#a09e93]" />

            <h2 className="mt-5 font-heading text-2xl font-semibold text-[#292b27]">
              No booking requests yet
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              New requests for your studios will appear here.
            </p>

            <Link
              href="/my-listings"
              className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#435947]"
            >
              My Listings
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-2xl font-semibold text-foreground">
                      {booking.studioTitle}
                    </h2>

                    <p className="mt-2 text-xs text-muted-foreground">
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

                <div className="mt-6 grid gap-5 border-t border-[#e4e1d7] pt-5 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <UserRound className="h-5 w-5 text-[#b66b50]" />
                    <div>
                      <p className="text-xs text-[#74766d]">Customer</p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {booking.customerName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {booking.customerEmail}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-[#b66b50]" />
                    <div>
                      <p className="text-xs text-muted-foreground">Booking Date</p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {new Date(
                          `${booking.bookingDate}T00:00:00`
                        ).toLocaleDateString("en-BD", {
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
                      <p className="text-xs text-[#74766d]">Booking Time</p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {booking.startTime} – {booking.endTime} (
                        {booking.duration} hours)
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Estimated Total</p>
                    <p className="mt-1 text-lg font-semibold text-primary">
                      ৳{booking.totalAmount.toLocaleString("en-BD")}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Security deposit: ৳
                      {booking.securityDeposit.toLocaleString("en-BD")}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                    <Link href={`/studios/${booking.studioId}`} 
                    className="text-sm font-semibold text-primary transition hover:text-[#b66b50]" >
                        View Studio →
                        </Link>
                        
                            <BookingActions
                            bookingId={booking._id}
                            ownerEmail={session.user.email}
                            status={booking.status}
                        />
                        
                    </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
