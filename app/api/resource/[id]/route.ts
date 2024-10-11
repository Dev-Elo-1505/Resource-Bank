import { resourceSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const resource = await prisma.resource.findUnique({
      where: { id: Number(id) },
    });
    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found." },
        { status: 400 }
      );
    }
    return NextResponse.json(resource, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch resource." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  const validation = resourceSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const updatedResource = await prisma.resource.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        description: body.description,
        url: body.url,
        category: body.category,
      },
    });
    return NextResponse.json(updatedResource, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update resource." });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const resource = await prisma.resource.findUnique({
      where: { id: Number(id) },
    });
    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found." },
        { status: 404 }
      );
    }

    await prisma.resource.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(
      { message: "Resource deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete resource." },
      { status: 500 }
    );
  }
}
