
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${process.env.API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    return NextResponse.json(
      { message: "Failed to submit booking request." },
      { status: 500 }
    );
  }
}
