
import { NextResponse } from "next/server";

type Props = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const body = await request.json();

    const response = await fetch(
      `${process.env.API_URL}/api/studios/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Delete studio error:", error);

    return NextResponse.json(
      { message: "Failed to delete studio." },
      { status: 500 }
    );
  }
}
