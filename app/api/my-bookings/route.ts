
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const customerEmail = searchParams.get("customerEmail");

    if (!customerEmail) {
      return NextResponse.json(
        { message: "Customer email is required." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.API_URL}/api/my-bookings?customerEmail=${encodeURIComponent(customerEmail)}`,
      { cache: "no-store" }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("My bookings API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch bookings." },
      { status: 500 }
    );
  }
}
