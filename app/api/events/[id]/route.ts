import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const event = await prisma.event.findUnique({
      where: {
        id: id,
      },
      include: {
        organization: true,
        skills: true,
        speakers: {
          include: {
            speaker: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Error fetching event" },
      { status: 500 }
    );
  }
}
