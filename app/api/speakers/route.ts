import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const speakers = await prisma.speaker.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(speakers);
  } catch (error) {
    console.error("Error fetching speakers:", error);
    return NextResponse.json(
      { error: "Error fetching speakers" },
      { status: 500 }
    );
  }
}
