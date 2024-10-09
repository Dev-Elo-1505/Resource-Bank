import { NextRequest, NextResponse } from "next/server";
import { resourceSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = resourceSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const newResource = await prisma.resource.create({
      data: {
        title: body.title,
        description: body.description,
        url: body.url,
        category: body.category,
      },
    });
    return NextResponse.json(newResource, { status: 201 });
  } catch (error) {
    console.error("Error creating resource", error);
    return NextResponse.json(
      { error: "Failed to create resource." },
      { status: 500 }
    );
  }
}
