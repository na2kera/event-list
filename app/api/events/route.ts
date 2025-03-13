import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        eventDate: new Date(body.eventDate),
        startTime: body.startTime,
        endTime: body.endTime,
        venue: body.venue,
        address: body.address,
        location: body.location,
        detailUrl: body.detailUrl,
        organizationId: body.organizationId,
        skills: {
          create: body.skills.map((skill: { name: string }) => ({
            name: skill.name,
          })),
        },
        speakers: {
          create: body.speakers.map((speaker: { speakerId: string }) => ({
            speakerId: speaker.speakerId,
          })),
        },
        categories: {
          create: body.categories.map((category: { categoryId: string }) => ({
            categoryId: category.categoryId,
          })),
        },
      },
      include: {
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
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Error creating event" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const events = await prisma.event.findMany({
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
      orderBy: {
        eventDate: "asc",
      },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Error fetching events" },
      { status: 500 }
    );
  }
}
