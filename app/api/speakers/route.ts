import { prisma } from "lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const speaker = await prisma.speaker.create({
      data: {
        name: body.name,
        occupation: body.occupation,
        affiliation: body.affiliation,
        bio: body.bio,
      },
    });
    return NextResponse.json(speaker);
  } catch (error) {
    console.error("Error creating speaker:", error);
    return NextResponse.json(
      { error: "Error creating speaker" },
      { status: 500 }
    );
  }
}

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
