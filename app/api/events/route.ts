import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const event = await prisma.event.create({
      data: {
        ...body,
        startDateTime: new Date(body.startDateTime),
        endDateTime: body.endDateTime ? new Date(body.endDateTime) : null,
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Error creating event" },
      { status: 500 }
    );
  }
}
